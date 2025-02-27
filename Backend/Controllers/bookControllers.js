const book_model = require("../Models/bookModel");
module.exports.getBook = async(req,res)=>{
try{
    const data = await book_model.find();
    console.log(data);
    res.json({
        "Status":"Success",
        "data":data
    })
}
catch(err){
console.log(err);
res.json({
    "status":"fail",
    "err":err.message
})
}   
}
module.exports.postBook = async(req,res)=>{
    try{
        const data = req.body;
        console.log(data);
        const send_data = await  book_model.create(data);
        res.json({
            "status":"success",
            "data":send_data
        })
    }
    catch(err){
        res.json({
            "status":"fail",
            "err":err.message
        })
    }
}
module.exports.putBook = async (req, res) => {
    try {
        const oldName = req.params.name;
        console.log("Old Book Name from URL:", oldName);
        const updatedData = req.body;
        console.log("Updated Data:", updatedData);
        if (updatedData.Name) {
            updatedData.Name = updatedData.Name;
        }
        const updatedBook = await book_model.findOneAndUpdate(
            { Name: oldName },   
            updatedData,          
            { new: true }        
        );
        if (!updatedBook) {
            return res.status(404).json({
                status: "fail",
                message: "Book not found"
            });
        }
        res.json({
            status: "success",
            data: updatedBook
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
};
module.exports.deleteBook = async (req, res) => {
    try {
        const data = req.params.name;
        console.log(data);
        const delete_data = await book_model.findOneAndDelete({ Name: data });
        if (!delete_data) {
            return res.json({
                "status": "fail",
                "message": "Book not found"
            });
        }
        res.json({
            "status": "Deleted",
            "data": delete_data
        });
    } catch (err) {
        res.json({
            "status": "fail",
            "err": err.message
        });
    }
};
