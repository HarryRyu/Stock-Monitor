import express from 'express';
import WatchListService from '../../database/WatchList/service'
import StockListService from '../../database/StockList/service'
import DailyTimeSeriesService from '../../database/DailyTimeSeries/service'
import QuestradeController from '../../controller/questradeController'
import CompanyOverviewService from '../../database/CompanyOverview/service'

const router = express.Router();

// Retrieves historical data from the database
router.post('/add/:watchlist/:symbol', async (req, res, next) => {
    const watchlist = req.params.watchlist;
    const symbol = req.params.symbol;
    try {
        let [{_id}] = await StockListService.findBySymbol(symbol)
        await WatchListService.add(watchlist, _id);

    } catch(err){ res.send({ error: "Error has occured"}) }
});

router.get('/all', async (req, res, next) => {
    try {
        let watchList = await WatchListService.findAll();
        res.send(watchList);

    } catch(err){ res.send({ error: "Error has occured"}) }
});

router.post('/retrieveWatchlist', async (req, res, next) => {
    const query = req.body.data;
    try {
        
        const watchList = await StockListService.findByIds(query);
        const symbolId = await QuestradeController().getStockBySymbol(watchList);
        const realTimeData = await QuestradeController().getRealTimeQuotes(symbolId.symbols);
        res.send(realTimeData.quotes);

    } catch(err){ res.send({ error: "Error has occured"}) }
});

router.post('/retrieveWatchlistHistoricalData', async (req, res, next) => {
    const query = req.body.data.data;
    const timeInterval = req.body.timeInterval
    try {
        const watchList = await StockListService.findByIds(query);
        const dailyTimeSeriesQuery = [];
        for (let item in watchList){
            dailyTimeSeriesQuery.push(watchList[item].Symbol)
        }
        const timeSeries = await DailyTimeSeriesService.findBySymbol(dailyTimeSeriesQuery);
        // // Send an API call to alphavantage if dailyTimeSeries data is not present in the database
        // if (!dailyTimeSeries){
        //     let controllerRes = await AlphaVantageController.getDailyTimeSeries(symbol);
        //     if (controllerRes){ 
        //         const object = formatDailyTimeSeries(controllerRes)
        //         dailyTimeSeries = await DailyTimeSeriesService.create(object)
        //     }
        // }
        let output;
        if (timeInterval === "OneMonth"){
            output = new Array(31);
            for (let i = 0; i < 31; i++){
                output[i] = {
                    date: timeSeries[0].Array[i].Date,
                    change: 0,
                }
            }
            for (let item in timeSeries){
                for (let i = 0; i < 31; i++){
                    const change = (timeSeries[item].Array[i].Close / timeSeries[item].Array[i].Open) - 1;
                    output[i].change = output[i].change + change;
                }
            }
            for (let i = 0; i < 31; i++) {
                output[i].change = output[i].change / timeSeries.length;
                console.log(output[i].change)
            }
        }

        if (timeInterval === "SixMonth"){
            let arraySize = 180
            for (let item in timeSeries) {
                if (timeSeries[item].Array.length < 180){
                    if (arraySize > timeSeries[item].Array.length){
                        arraySize = timeSeries[item].Array.length;
                    }
                }
            }
            output = new Array(arraySize);
            for (let i = 0; i < arraySize; i++){
                output[i] = {
                    date: timeSeries[0].Array[i].Date,
                    change: 0,
                }
            }
            for (let item in timeSeries){
                const base = timeSeries[item].Array[arraySize - 1].Close
                for (let i = 0; i < arraySize; i++){
                    const change = ((timeSeries[item].Array[i].Close / base) - 1) * 100;
                    output[i].change = output[i].change + change;
                }
            }
            for (let i = 0; i < arraySize; i++) {
                output[i].change = output[i].change / timeSeries.length;
            }
            output = output.reverse();
        }

        if (timeInterval === "OneYear"){
            let arraySize = 365
            for (let item in timeSeries) {
                if (timeSeries[item].Array.length < 365){
                    if (arraySize > timeSeries[item].Array.length){
                        arraySize = timeSeries[item].Array.length;
                    }
                }
            }
            output = new Array(arraySize);
            for (let i = 0; i < arraySize; i++){
                output[i] = {
                    date: timeSeries[0].Array[i].Date,
                    change: 0,
                }
            }
            for (let item in timeSeries){
                const base = timeSeries[item].Array[arraySize - 1].Close
                for (let i = 0; i < arraySize; i++){
                    const change = ((timeSeries[item].Array[i].Close / base) - 1) * 100;
                    output[i].change = output[i].change + change;
                }
            }
            for (let i = 0; i < arraySize; i++) {
                output[i].change = output[i].change / timeSeries.length;
            }
            output = output.reverse();
        }

        if (timeInterval === "FiveYear"){
            output = new Array(100);
            for (let i = 0; i < 100; i++){
                output[i] = {
                    date: timeSeries[0].Array[i*18].Date,
                    change: 0,
                }
            }
            for (let item in timeSeries){
                for (let i = 0; i < 100; i++){
                    const change = (timeSeries[item].Array[i*18].Close / timeSeries[item].Array[i*18].Open) - 1;
                    output[i].change = output[i].change + change;
                }
            }
            for (let i = 0; i < 100; i++) {
                output[i].change = output[i].change / timeSeries.length;
            }
        }
        res.send(output);

    } catch(err){ res.send({ error: "Error has occured"}) }
});

router.post('/retrieveSector', async (req, res, next) => {
    const query = req.body.data.data;
    try {
        const watchList = await StockListService.findByIds(query);
        const companyOverviewQuery = [];
        for (let item in watchList){
            companyOverviewQuery.push(watchList[item].Symbol)
        }
        let companyOverview = await CompanyOverviewService.findBySymbol(companyOverviewQuery);
        res.send(companyOverview);

    } catch(err){ res.send({ error: "Error has occured"}) }
});

router.post('/newWatchlist', async (req, res, next) => {
    const query = req.body.data.data;
    try {
        WatchListService.create({List: [], Title: query})

    } catch(err){ res.send({ error: "Error has occured"}) }
});

export default router;