const mongoose = require('mongoose');

//const renderDB =require('../etc/secrets/DB_STRING.env')//'../etc/secrets')

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        const conn = await mongoose.connect(process.env.DB_STRING);
        //const conn = await mongoose.connect(renderDB)//process.env.DB_STRING);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error('Database Connection Error:', err.message);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDB;
