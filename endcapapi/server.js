const http =require('http')
const fs = require("fs")    
const path = require("path")    
const url = require("url")
const querystring = require("querystring")
const express = require("express")
const app = express()
const PORT = 8000
// app.use(express.static(path.join(__dirname, "public")));

let inventoryToys = [
    {
    "name": "Monopoly Classic Game",
    "manufacturer": "Hasbro",
    "cost": 19.99,
    "profit": 10.00,
    "price": 29.99,
    "weight": 2.5,
    "height": 10.5,
    "width": 15.8,
    "depth": 2.0,
    "onHand": 40,
    "salesFloorCount": 20,
    "backroomCount": 20,
    "SKU": 112233445,
    "UPC": 112233445566,
    "supplier": "Hasbro, Inc.",
    "shippingWeight": 3.0,
    "packageDimensions": 10.6,
    "casePack": 10,
    "department": "Toys",
    "category": "Board Games",
    "color": "Multicolor",
    "salesFloorLocation": [
        "H10-01, 04-071"
    ],
    "backroomLocation": [
        "I02/010/001"
    ],
    "shelfCapQuantity": 12
}
//     {"name"             : "",
//     "manufacturer"      : "",
//     "cost"              : 0.00,
//     "profit"             : 0.00,
//     "price"             : 0.00,
//     "weight"            : 0.00,
//     "height"            : 0.00,
//     "width"             : 0.00,
//     "depth"             : 0.00,
//     "onHand"            : 0,
//     "salesFloorCount"   : 0,
//     "backroomCount"     : 0,
//     "SKU"               : 000000000,
//     "UPC"               : 0000000000,
//     "supplier"          : "",
//     "shippingWeight"    : 0.00,
//     "packageDimensions" : 0.00,
//     "casePack"          : 0,
//     "department"        : "",
//     "category"          : "",
//     "color"             : "",
//     "salesFloorLocation": ["A00-00, 0000-0000"],
//     "backroomLocation"  : ["A00/000/000"],
//     "shelfCapQuantity"  : 0,
// }
]

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})
app.get("/api/:sqft",(req,res)=>{
    volume= req.params.sqft
    const filePath = path.join(__dirname,'public','inventory.json')
    console.log(filePath)
    fs.readFile(filePath,'utf8',(err,data)=>{
        if(err){
            console.error("Error reading the file: ", err);
            res.status(500).json({error:"Internal Server Error"});
            return;
        } 
        try {
            const jsonData = JSON.parse(data);
            const inventory = jsonData.inventoryToys;
            suggestedItems = inventory.filter((item)=> item.height *item.width*item.depth*(item.onHand - item.shelfCapQuantity)> volume);
            res.json(suggestedItems);
        } catch(parseErr) {
            console.error("Error parsing JSON: ", parseErr);
            res.status(500).json({error: "Internal Server Error"});//that's a obj??
        }
    })

   
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is running on ${PORT}`)
})