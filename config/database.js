const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn =await mongoose.connect(process.env.MONGI_URI,{
            useNewUrlParser: true, 
            useUnitiedTopology: true,
            useFindAndModify: false
        })
        console.log(`MongoDB Connected: ${conn.connection.host}` )
    } catch(err){
console.error(err)
//The exit code. For string type, only integer strings '1' for failure or 0 for success 
process.exit(1)
    }
}
module.exports = connectDB