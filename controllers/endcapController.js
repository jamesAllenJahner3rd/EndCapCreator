const Inventory = require("../models/inventory");
console.log("controller triggered");
module.exports = {
    getEndcap: (req,res)=>{
        res.render('index.ejs', { suggestedItems: [] })
    },
    searchInventory: async (req,res)=>{
        const { shelfHeight, shelfWidth, shelfDepth } = req.query;
        const volume = shelfHeight * shelfWidth * shelfDepth; 
        console.log(`Calculated Volume: ${volume}`);
        try {
            console.log("Trying to parse JSON data");
            const jsonData = await Inventory.find({}).sort({profit:"desc"}).lean();
            console.log(`jsonData: ${jsonData}`);

            //console.log("JSON data:", jsonData);
            if (!jsonData || !jsonData.length) { 
                console.error("No inventory found."); 
                return res.status(404).json({
                    error: "No inventory found" 
                    }); }
            
            let suggestedItems = jsonData.filter(item =>
                (item.height + 2.5) * item.width * item.depth * (item.onHand - item.shelfCapQuantity) > volume
            );
           
            suggestedItems.forEach(item => {
                item['shelfTotal'] = shelfHeight / (item.height + 2.5) - 1;
            });
            console.error('suggestedItems',suggestedItems); 
            //suggestedItems = suggestedItems.sort((a, b) => b.profit - a.profit);
            const sampleData = [ { name: 'Sample Item 1', price: 10, onHand: 5, UPC: '12345' }, { name: 'Sample Item 2', price: 20, onHand: 3, UPC: '67890' }]
            //res.json(suggestedItems);
             res.render('index.ejs',{suggestedItems:suggestedItems})
        } catch (parseErr) { 
            console.error("Error fetching data from the database: ", parseErr);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}