import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema({
    Symbol: String,
    LastUpdated: Date,
    Array: [{
      _id: false,
      Date: String,
      Open: Number, 
      Low: Number, 
      High: Number,
      Close: Number,
      Volume: Number,
    }],
})

const finalModel = model('DailyAdjusted', schema)

export default finalModel;