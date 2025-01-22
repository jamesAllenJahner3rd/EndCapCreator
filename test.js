searchInventory: async (req, res) => {
    console.log("searching inventory");

    const { shelfHeight, shelfWidth, shelfDepth } = req.query;
    const volume = shelfHeight * shelfWidth * shelfDepth;

    console.log(`Calculated Volume: ${volume}`);

    try {
        const filePath = path.join(__dirname, '../public/inventory.json');
        const data = fs.readFileSync(filePath, 'utf8');

        console.log("Trying to parse JSON data");
        const jsonData = JSON.parse(data);
        const inventory = jsonData.inventoryToys;

        let suggestedItems = inventory.filter(item =>
            (item.height + 2.5) * item.width * item.depth * (item.onHand - item.shelfCapQuantity) > volume
        );

        suggestedItems.forEach(item => {
            item['shelfTotal'] = shelfHeight / (item.height + 2.5) - 1;
        });

        suggestedItems = suggestedItems.sort((a, b) => b.profit - a.profit);

        res.json(suggestedItems);

    } catch (err) {
        console.error("Error reading or parsing the file: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
