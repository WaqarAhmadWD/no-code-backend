exports.createTables = async(model)=>{
    try {
        const getAllTables = await model.table.findAll();
        console.log(getAllTables.map(e=>e.name)); 
    } catch (error) {
        throw new Error("Couldn't find table");
    }
}