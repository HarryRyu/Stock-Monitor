import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema({
    Symbol: String,
    LastUpdated: Date,
    AnnualReports: [{
      _id: false,
      fiscalDateEnding: Date,
      reportedCurrency: String,
      investments: Number,
      changeInLiabilities: Number,
      cashflowFromInvestment: Number,
      otherCashflowFromInvestment: Number,
      netBorrowings: Number,
      cashflowFromFinancing: Number,
      otherCashflowFromFinancing: Number,
      changeInOperatingActivities: Number,
      netIncome: Number,
      changeInCash: Number,
      operatingCashflow: Number,
      otherOperatingCashflow: Number,
      depreciation: Number,
      dividendPayout: Number,
      stockSaleAndPurchase: Number,
      changeInInventory: Number,
      changeInAccountReceivables: Number,
      changeInNetIncome: Number,
      capitalExpenditures: Number,
      changeInReceivables: Number,
      changeInExchangeRate: String,
      changeInCashAndCashEquivalents: Number
    }, { required: true }],
})

const finalModel = model('CashFlow', schema)

export default finalModel;