const attribute = require("../models/attribute");
const Sequelize = require("sequelize");
const fs = require('fs');
const path = require('path');
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
exports.createTables = async (model) => {
    try {
      const getAllTables = await model.table.findAll({
        include: { all: true, nested: true },
      });
    
      getAllTables.forEach((table) => {
        // Extract table name
        const tableName = table.name;
    
        // Format fields for Sequelize model
        const fields = table.fields.reduce((acc, field) => {
          acc[field.name] = field.attributes.reduce((fieldAcc, attr) => {
            if(attr.value==="true"){
                attr.value = true;
            }
            if(attr.value==="false"){
                attr.value = false;
            }
            fieldAcc[attr.name] = attr.value
       
            return fieldAcc;
          }, {});
          return acc;
        }, {});
        let transformedFields = JSON.stringify(fields, null, 2);

        // Step 3: Remove quotes around keys
        transformedFields = transformedFields.replace(/"([^"]+)":/g, '$1:');
        
        // Step 4: Remove quotes around Sequelize types
        transformedFields = transformedFields.replace(/"Sequelize\.(\w+)"/g, 'Sequelize.$1');
        // .replace(/"Sequelize\.(\w+)"/g, 'Sequelize.$1');
        // Generate Sequelize model template
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
        // console.log(modelTemplate)
        // Define file path
        const filePath = path.join(__dirname, "..", "models", "dynamic", `${tableName}.js`);
        

        // Check if file already exists
        if (fs.existsSync(filePath)) {
          console.log(`Model for table "${tableName}" already exists. Skipping...`);
          return;
        }
        const moduleExporting = path.join(__dirname, "..", "models", "dynamic_index.js");
        fs.readFile(moduleExporting,function(err, data) {
            // console.log(err,data.toString());
            if(err){
                return;
            }
            const updatedDynamicIndex = appendKeyToModuleExports(data.toString(),tableName);
            fs.writeFileSync(moduleExporting,updatedDynamicIndex)
        });
        // Write the model to a file
        fs.writeFileSync(filePath, modelTemplate);
        console.log(`Model written to file: ${filePath}`);
      });
    } catch (error) {
      console.error("Error in DB Operations:", error);
    }
};
