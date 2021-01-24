import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema({
    Symbol: String,
    LastUpdated: Date,
    AnnualEarnings: [{
        _id: false,
        fiscalDateEnding: Date,
        reportedEPS: Number,
    }, { required: true }],
    QuarterlyEarnings: [{
        _id: false,
        fiscalDateEnding: Date,
        reportedDate: Date,
        reportedEPS: Number,
        estimatedEPS: Number,
        surprise: Number,
        surprisePercentage: Number
    }, { required: true }],
})

const finalModel = model('Earnings', schema)

export default finalModel;