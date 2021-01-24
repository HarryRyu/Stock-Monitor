import mongoose from 'mongoose';

export default function connectToDatabase(){
    mongoose.connect('mongodb://localhost:27017/StockDatabase', {
        useNewUrlParser: true,
        useCreateIndex: true,
    })

    const db = mongoose.connection;
    db.on('error', () => console.log("Connection error with the database"));
    db.once('open', () => console.log("Successfully connected to the database"));
};