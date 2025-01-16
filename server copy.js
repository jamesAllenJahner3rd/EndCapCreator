const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/api/checkInventory/:volume&:endcapHeight&:shelfVolume", (req, res) => {
    const volume = req.params.volume;
    const shelfVolume = req.params.shelfVolume;
    const endcapHeight = req.params.endcapHeight;
    const filePath = path.join(__dirname, 'public', 'inventory.json');
    
   // console.log('volume', volume, "shelfVolume", shelfVolume, "endcapHeight", endcapHeight, filePath);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading the file: ", err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        try {
            console.log("Trying to parse JSON data");
            const jsonData = JSON.parse(data);
            //console.log("JSON data:", jsonData);
            const inventory = jsonData.inventoryToys;
            //console.log('Inventory:', inventory);
            let suggestedItems = inventory.filter(item => 
                (item.height + 2.5) * item.width * item.depth * (item.onHand - item.shelfCapQuantity) > volume
            );
           // console.log("Suggested items count:", suggestedItems.length);
            suggestedItems.forEach(item => {
                item['shelfTotal'] = endcapHeight / (item.height + 2.5) - 1;
            });

            suggestedItems = suggestedItems.sort((a, b) => b.profit - a.profit);
           //console.log("Suggested items:", suggestedItems);
            res.json(suggestedItems);
        } catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT||8000}`);
});
