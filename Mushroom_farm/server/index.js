const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./images')
    },
    filename: (req,file,cb)=>{
        cb(null,file.filedname + "_"+Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

const PORT = process.env.PORT || 8080

const User = require("./models/user");
const Dashboard = require("./models/dashboard");
const Delivery  = require("./models/delivery")
const Product = require("./models/product")
const Sales = require("./models/order")
// const Inventory = require("./models/inventory")
const Complaint = require("./models/complaints")
const DeliveryDetails = require("./models/deliveryDetails")
const { restart } = require('nodemon')

app.get("/deliveryDetails",async(req,res)=>{
    const data = await DeliveryDetails.find({})
    res.json({success:true,data:data})
})

//read
app.get("/complaints",async(req,res)=>{
 const data = await Complaint.find({})
 res.json({success : true, data : data})
})



//create data //save data to mongo
//http://localhost:8080/create
// app.put("/product/update", async (req, res) => {
//     const { _id, ...rest } = req.body;
//     const id = req.body[0]._id;
//     const indexToUpdate =0;

//     console.log('Request Body:', req.body);
//     console.log('Rest:', rest);
//     console.log(`Index to Update: ${indexToUpdate}`);

//     try {
//         // Fetch the current document from the database
//         const currentDocument = await Product.find({});

//         if(rest){
//             console.log("rest.",rest);
//             console.log("indexToUpdate ",indexToUpdate)

//         // Log the previous value of the field
//         const restAtIndex = rest[indexToUpdate];

//         console.log(`Previous Value: ${currentDocument[indexToUpdate].volume} ** volume: `,rest[indexToUpdate]);


//         if (restAtIndex && restAtIndex.volume !== undefined) {
//             console.log("query")
//             console.log(`${indexToUpdate}.volume`)
//             console.log(id)
//             const updateResult = await Product.updateOne(
//                 { _id: id },
//                 { $set: { [`volume`]: restAtIndex.volume } }
//             );
//             console.log("updateResult")
//             console.log(updateResult)

//             if (updateResult.modifiedCount > 0) {
//                 return res.send({ success: true, message: `Data at index ${indexToUpdate} updated successfully` });

//                 // Fetch the updated document from the database
//                 // const updatedDocument = await Product.findById(_id);

//                 // // Log the altered value of the field
//                 // console.log(`Altered Value: ${updatedDocument[indexToUpdate].volume}`);
//             } else {
//                 return res.send({ success: false, message: `Data at index ${indexToUpdate} was not updated` });
//             }
//         } else {
//             return res.send({ success: false, message: `Invalid data or volume undefined at index ${indexToUpdate}` });
//         }
//     }
//     else{
//         return res.send({ success: false, message: `Invalid data or volume undefined` });
//     }
//     } catch (err) {
//         console.log(err);
//         return res.status(500).send({ success: false, message: "Error updating data" });
//     }
// });





//read
app.get("/delivery",async(req,res)=>{
    const data = await Delivery.find({})
   res.json({success : true, data : data})
})

//create data //save data to mongo
//http://localhost:8080/create
app.post("/delivery/create",async(req,res)=>{
    console.log(req.body)
    const data = new Delivery(req.body)
    await data.save()
    res.send({success : true,message : "data saved succesfully", data : data})
})

//update data
//http://localhost:8080/update
app.put("/delivery/update",async(req,res)=>{
    console.log(req.body)
    const {_id,...rest} = req.body

    console.log(rest)
    const data = await Delivery.updateOne({_id : _id},rest)
    res.send({success : true,message : "data updated successfully", data : data})
})

//delete
//http://localhost:8080/delete
app.delete("/delivery/delete/:id",async(req,res)=>{
   const id =  req.params.id
   console.log(id)
   const data = await Delivery.deleteOne({_id : id})
   res.send({success : true,message : "data deleted successfully", data : data})
})

//read
app.get("/dashboard",async(req,res)=>{
    const data = await Dashboard.find({})
   res.json({success : true, data : data})
   console.log(data)
})

//read
app.get("/users",async(req,res)=>{
    const data = await User.find({})
   res.json({success : true, data : data})
})

app.get("/sales",async(req,res)=>{
    const data = await Sales.find({})
   res.json({success : true, data : data})
})

// app.get("/inventory",async(req,res)=>{
//   const data = await Inventory.find({})
//  res.json({success : true, data : data})
// })

mongoose.connect("mongodb://127.0.0.1:27017/user")
.then(()=>{
console.log("Connected to DB")
app.listen(PORT,()=>console.log("Sever is running"))
})
.catch((err)=>console.log(err))


//product entry
app.post("/product/upload",upload.single('file'),(req,res)=>{
    console.log(req.file)
})

app.get("/product",async(req,res)=>{
    const data = await Product.find({})
   res.json({success : true, data : data})
})



//create data //save data to mongo
//http://localhost:8080/create
app.post("/product/create",async(req,res)=>{
    console.log(req.body)
    const data = new Product(req.body)
    await data.save()
    res.send({success : true,message : "data saved succesfully", data : data})
})



//update data
//http://localhost:8080/update
app.put("/product/update",async(req,res)=>{
    console.log(req.body)
    const {_id,...rest} = req.body

    console.log(rest)
    const data = await Product.updateOne({_id : _id},rest)
    res.send({success : true,message : "data updated successfully", data : data})
})

//delete
//http://localhost:8080/delete
app.delete("/product/delete/:id",async(req,res)=>{
   const id =  req.params.id
   console.log(id)
   const data = await Product.deleteOne({_id : id})
   res.send({success : true,message : "data deleted successfully", data : data})
})