import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
    Title: String,
    List: [{
        type: ObjectId, ref: 'StockList'
    }]
})

const finalModel = model('WatchList', schema)

export default finalModel;