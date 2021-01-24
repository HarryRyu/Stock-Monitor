import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema({
    Symbol: String,
    Name: String,
    Exchange: String,
    AssetType: String,
    IpoDate: Date,
})

const finalModel = model('StockList', schema)

export default finalModel;