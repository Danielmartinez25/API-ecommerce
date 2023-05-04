const mongoose = require('mongoose')

const mongoDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_CONNECTION)
    } catch (error) {
        
    }
}