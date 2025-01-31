const {options} = require("../configDB");
const deep_level = options.last_level.level;
module.exports = function transform(input, level = 1, parent = []) {
    if(input?.children?.length < 1 && level < deep_level){
      input = {name:parent.name,children:[input]}
      // throw new Error("You must Fill all five Levels");
    }
    if (!input || typeof input !== "object") return input;
    // Create the new structure with a level key
    const result = {
      name: input.name,
      [`level_${String(level).padStart(2, '0')}s`]: input.children.map((child) =>
        transform(child, level + 1, input)
      ),
    };
    return result;
  }