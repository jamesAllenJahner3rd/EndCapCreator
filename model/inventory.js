const { default: mongoose } = require("mongoose");
//const mongoose = require("mongoose");
//ai get's rid of this.\/
const InventorySchema = new mongoose.Schema({
    
        "name": {
            type: String,
            required: true,
        },
        "manufacturer": {
            type: String,
            required: true,
        },
        "cost": {
            type: Number,
            required: true,
        },
        "profit": {
            type: Number,
            required: true,
        },
        "price": {
            type: Number,
            required: true,
        },
        "weight": {
            type: Number,
            required: true,
        },
        "height": {
            type: Number,
            required: true,
        },
        "width": {
            type: Number,
            required: true,
        },
        "depth": {
            type: Number,
            required: true,
        },
        "onHand": {
            type: Number,
            required: true,
        },
        "salesFloorCount": {
            type: Number,
            required: true,
        },
        "backroomCount": {
            type: Number,
            required: true,
        },
        "SKU": {
            type: Number,
            required: true,
        },
        "UPC": {
            type: Number,
            required: true,
        },
        "supplier": {
            type: String,
            required: true,
        },
        "shippingWeight": {
            type: Number,
            required: true,
        },
        "casePack": {
            type: Number,
            required: true,
        },
        "department": {
            type: String,
            required: true,
        },
        "category": {
            type: String,
            required: true,
        },
        "color": {
            type: String,
            required: true,
        },
        salesFloorLocation: {
             type: [String], // Array of strings
             required: true,
        },
        backroomLocation: {
            type: [String],
            required: true,
        },
        "shelfCapQuantity": {
            type: Number,
            required: true,
        }
})
// const Inventory = mongoose.model('Inventory', InventorySchema); 
// module.exports = Inventory;