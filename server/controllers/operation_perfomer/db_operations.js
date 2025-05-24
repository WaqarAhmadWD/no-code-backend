const db = require("../../configDB");
const fs = require("fs").promises;
const path = require("path");

function appendKeyToModuleExports(codeStr, key) {
    // Create a regex to check for the property name followed by an optional whitespace and a colon.
    const keyRegex = new RegExp("\\b" + key + "\\s*:");
    
    // If the key already exists, return the original code string.
    if (keyRegex.test(codeStr)) {
      return codeStr;
    }
  
    // Find the index of the last closing brace, assumed to be the end of the object literal.
    const lastBraceIndex = codeStr.lastIndexOf("}");
    if (lastBraceIndex === -1) {
      throw new Error("Closing brace not found in the provided code.");
    }
  
    // Check the character immediately before the closing brace to decide if a comma is needed.
    const charBeforeBrace = codeStr[lastBraceIndex - 1];
    let insertion;
    if (charBeforeBrace !== "," && charBeforeBrace.trim() !== "") {
      // Insert a comma if needed
      insertion = ",\n    " + key + `: require('./dynamic/${key}.js')(sequelize, Sequelize)\n`;
    } else {
      insertion = "    " + key + `: require('./dynamic/${key}.js')(sequelize, Sequelize)\n`;
    }
  
    // Insert the new key/value pair right before the final closing brace.
    const modifiedCode =
      codeStr.slice(0, lastBraceIndex) + insertion + codeStr.slice(lastBraceIndex);
    return modifiedCode;
  }

const modelsDir = path.join(__dirname, "..", "models");
const dynamicModel = path.join(modelsDir, "dynamic");
const moduleExporting = path.join(modelsDir, "dynamic_index.js");

exports.createTables = async (req, res) => {
  try {
    const getAllTables = await db.module.table.findAll({
      include: { all: true, nested: true },
    });

    if (getAllTables?.length === 0) {
      // Overwrite dynamic_index.js with empty export
      await fs.writeFile(moduleExporting, "module.exports = (sequelize, Sequelize) => ({})");

      // Read and delete all files in the dynamic folder
      const files = await fs.readdir(dynamicModel);

      await Promise.all(
        files.map(async (file) => {
          const filePath = path.join(dynamicModel, file);
          const stat = await fs.lstat(filePath);
          if (stat.isFile() && file !== "dynamic_index.js") {
            await fs.unlink(filePath);
          }
        })
      );

      return res.status(200).json({
        message: "Flushed (deleted) Successfully",
        data: [],
      });
    }

    for (const table of getAllTables) {
      const tableName = table.name;

      const fields = table.fields.reduce((acc, field) => {
        acc[field.name] = field.attributes.reduce((fieldAcc, attr) => {
          if (attr.value === "true") attr.value = true;
          if (attr.value === "false") attr.value = false;
          fieldAcc[attr.name] = attr.value;
          return fieldAcc;
        }, {});
        return acc;
      }, {});

      let transformedFields = JSON.stringify(fields, null, 2)
        .replace(/"([^"]+)":/g, "$1:")
        .replace(/"Sequelize\.(\w+)"/g, "Sequelize.$1");

      const modelTemplate = `
    module.exports = (sequelize, Sequelize) => {
      const ${tableName} = sequelize.define(
        '${tableName}',
        ${transformedFields},
        {
          underscored: true,
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          freezeTableName: true,
        }
      );
    
      return ${tableName};
    };
    `;

      const filePath = path.join(dynamicModel, `${tableName}.js`);

      // try {
      //   await fs.access(filePath); // Check if file exists
      //   console.log(`Model for table "${tableName}" already exists. Skipping...`);
      //   continue;
      // } catch {
      //   // File does not exist, proceed to write it
      // }

      const dynamicIndexData = await fs.readFile(moduleExporting, "utf8");
      const updatedDynamicIndex = appendKeyToModuleExports(dynamicIndexData, tableName);
      await fs.writeFile(moduleExporting, updatedDynamicIndex);

      await fs.writeFile(filePath, modelTemplate);
      console.log(`Model written to file: ${filePath}`);
    }

    return res.status(200).json({
      message: "Models created successfully",
      data: getAllTables,
    });

  } catch (error) {
    return res.status(500).json({
      message: error?.message || "Something went wrong",
      data: error,
    });
  }
};
