// const port =4000;
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");
// const cors = require("cors");
// const { error } = require("console");
// const { request } = require("http");

// app.use(express.json());
// app.use(cors());
// // Database Connection with MongoDb
// mongoose.connect("mongodb+srv://umeshapubudi57:73y9n77Gv21obTr6@cluster0.lp7wc.mongodb.net/Ecommerce");

// //API 
// app.get("/",(request,response)=>{
//     response.send("Express API Running")

// })

// const storage = multer.diskStorage({
//     destination: '/upload/images',
//     filename: (request,file,cb)=>{
//         return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)

//     }

// })

// const upload = multer({storage:storage})


// app.use('/images', express.static('upload/images'));

// // app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// app.post("/upload",upload.single('product'),(request,response)=>{
//     response.json({
//         success:1,
//         image_url:`http://localhost:${port}/images/${request.file.filename}`
//     })

// })



// app.listen(port,(error)=>{
//     if(!error){
//         console.log("Server Running on port"+port)


//     }
//     else{
//         console.log("Error:"+error)
//     }
// })



const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const { type } = require("os");

app.use(express.json());
app.use(cors());


const uploadDir = 'upload/images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


mongoose.connect("mongodb+srv://umeshapubudi57:73y9n77Gv21obTr6@cluster0.lp7wc.mongodb.net/Ecommerce")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));


app.get("/", (req, res) => {
    res.send("Express API Running");
});


const storage = multer.diskStorage({
    destination: 'upload/images', 
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });


app.use('/images', express.static('upload/images'));


app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "File upload failed" });
    }
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema For Creating Product

const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required:true,

    },
    name:{
        type:String,
        required:true,

    },
    image:{
        type:String,
        required:true,

    },
    category:{
        type:String,
        required:true,

    },
    new_price:{
        type: Number,
        required:true,

    },
    old_price:{
        type: Number,
        required:true,

    },
    date:{
        type: Date,
        default:Date.now,

    },
    avilable:{
        type:Boolean,
        default:true,
    },
     


})

app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
const product = new Product({
    id:id,
    name:req.body.name,
    image:req.body.image,
    category:req.body.category,
    new_price:req.body.new_price,
    old_price:req.body.old_price,
});
console.log(product);
await product.save();
console.log("Saved");
res.json({
    success:true,
    name:req.body.name,
    
})
    

    
})
app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

app.get('/allproduct',async (req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);

})




app.listen(port, (error) => {
    if (!error) {
        console.log(`Server Running on port ${port}`);
    } else {
        console.log("Error:", error);
    }
});
