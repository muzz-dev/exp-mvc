const router = require("express").Router()
const Book = require("../models/Book")

router.post("/",function(req,res){	
	//INSERT	
	console.log(req.body)
	// var book1 = new Book({
    //         name : req.body.name,
    //         price : req.body.price,
    //         quantity : req.body.quantity
    //     }); 
		var book1 = new Book({
            name : "World of MSA",
            price : 18000,
            quantity : 69
        }); 
	book1.save(function (err, book) {
	      if (err) return console.error(err);
	      id=book._id;
	      console.log(book._id + " saved to books collection.");	      
	      res.status(200).send(book);
	      //res.send(book._id + " saved to books collection.")
    }); 
})

router.get("/",(req,res)=>{
//Get all
	Book.find(function (err, books) {
  		if (err) return console.error(err);
  		console.log(books);
  		res.send(books);
		  //res.render("list",{books:books})
	})
});
router.get("/:id",(req,res)=>{
	//Get one req.params.id
	Book.findById({"_id":req.params.id}, function (err, book) 
	{
        if (err) return res.status(500).send(
        	"There was a problem finding.");
        if (!book) return res.status(404).send(
        	"No data found.");
        res.status(200).send(book);
    });
});

router.put("/:id",(req,res)=>{
//UPDATE  req.params.id, req.body
    Book.findOneAndUpdate({"_id":req.params.id}, req.body, 
    	{new: true}, function (err, book) {
        if (err) return res.status(500).send(
        	"There was a problem updating.");
        res.status(200).send(book);
    });
});

router.delete("/:id",(req,res)=>{
//DELETE req.params.id deleteOne() deleteMany() findOneAndRemove()
	Book.findOneAndRemove({"_id":req.params.id},
	 function (err, book) {
        if (err) return res.status(500).send(
        	"There was a problem deleting.");
        res.status(200).send(book);
    });
});


module.exports=router