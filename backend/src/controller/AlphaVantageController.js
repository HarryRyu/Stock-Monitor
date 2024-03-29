import axios from 'axios';

const APIKey = 'Z7CFI49KY1HULTET'
const baseURL = 'https://www.alphavantage.co'
const Axios = axios.create({ baseURL: baseURL });

const controller = {
    // Getting daily time series
    getDailyTimeSeries: (symbol) => {
        return new Promise((resolve, reject) => {
            Axios.get(`query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${APIKey}`)
            .then(res => {
                if (res.data["Error Message"]){
                    console.log("Error Message received from AlphaVantage")
                    reject(res.data)
                } else if (!res.data["Meta Data"]){
                    console.log("Empty JSON receieved from AlphaVantage")
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
            .catch(err => {
                console.log("Could not retrieve the daily time series API from AlphaVantage")
                reject(err);
            })
        })
    },
    // Gets the company overview 
    getCompanyOverview: (symbol) => {
        return new Promise((resolve, reject) => {
            Axios.get(`query?function=OVERVIEW&symbol=${symbol}&apikey=${APIKey}`)
            .then(res => {
                if (res.data["Error Message"]){
                    console.log("Error Message received from AlphaVantage")
                    reject(res.data)
                } else if (!res.data.symbol){
                    console.log("Empty JSON receieved from AlphaVantage")
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
            .catch(err => {
                console.log("Could not retrieve the company overview API from AlphaVantage")
                reject(err);
            })
        })
    },
    // Gets the income statement
    getIncomeStatement: (symbol) => {
        return new Promise((resolve, reject) => {
            Axios.get(`query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${APIKey}`)
            .then(res => {
                if (res.data["Error Message"]){
                    console.log("Error Message received from AlphaVantage")
                    reject(res.data)
                } else if (!res.data.symbol){
                    console.log("Empty JSON receieved from AlphaVantage")
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
            .catch(err => {
                console.log("Could not retrieve the company overview API from AlphaVantage")
                reject(err);
            })
        })
    },
        // Gets the company overview 
    getBalanceSheet: (symbol) => {
        return new Promise((resolve, reject) => {
            Axios.get(`query?function=BALANCE_SHEET&symbol=${symbol}&apikey=${APIKey}`)
            .then(res => {
                if (res.data["Error Message"]){
                    console.log("Error Message received from AlphaVantage")
                    reject(res.data)
                } else if (!res.data.symbol){
                    console.log("Empty JSON receieved from AlphaVantage")
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
            .catch(err => {
                console.log("Could not retrieve the company overview API from AlphaVantage")
                reject(err);
            })
        })
    },
    // Gets the company overview 
    getCashFlow: (symbol) => {
        return new Promise((resolve, reject) => {
            Axios.get(`query?function=CASH_FLOW&symbol=${symbol}&apikey=${APIKey}`)
            .then(res => {
                if (res.data["Error Message"]){
                    console.log("Error Message received from AlphaVantage")
                    reject(res.data)
                } else if (!res.data.symbol){
                    console.log("Empty JSON receieved from AlphaVantage")
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
            .catch(err => {
                console.log("Could not retrieve the company overview API from AlphaVantage")
                reject(err);
            })
        })
    },
    // 
    getEarning: (symbol) => {
        return new Promise((resolve, reject) => {
            Axios.get(`query?function=EARNINGS&symbol=${symbol}&apikey=${APIKey}`)
            .then(res => {
                if (res.data["Error Message"]){
                    console.log("Error Message received from AlphaVantage")
                    reject(res.data)
                } else if (!res.data.symbol){
                    console.log("Empty JSON receieved from AlphaVantage")
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
            .catch(err => {
                console.log("Could not retrieve the company overview API from AlphaVantage")
                reject(err);
            })
        })
    },
}

export default controller;