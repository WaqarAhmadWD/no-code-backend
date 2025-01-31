exports.createTables = async(model)=>{
    try {
        const getAllTables = await model.table.findAll();
        console.log(getAllTables.map(e=>e.name)); 
    } catch (error) {
       console.error("Error in DB Operations:",error)
    }
}