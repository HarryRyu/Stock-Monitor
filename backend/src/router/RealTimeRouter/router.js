import express from 'express';
import QuestradeController from '../../controller/questradeController'
import parseISO from 'date-fns/parseISO/index.js'
import format from 'date-fns/format/index.js'
import startOfDay from 'date-fns/startOfDay'
import subDays from 'date-fns/subDays'

const router = express.Router();

// Retrieves historical data from the database
router.get('/:symbol', async (req, res, next) => {
    const symbol = req.params.symbol;
    try {
        // Retrieve data from the database baesd on stock symbol
        let candles = await QuestradeController().getHistoricalData(symbol, "2020-12-24T00:00:00-05:00", "2020-12-24T18:00:00-05:00", "TenMinutes")
        candles.data.candles.pop()
        res.send(candles.data.candles);;

    } catch(err){ res.send({ error: "Error has occured"}) }
});

router.get('/quote/:symbol', async (req, res, next) => {
    const symbol = req.params.symbol;
    try {
        const symbolId = await QuestradeController().getStockBySymbol([{Symbol: symbol}]);
        const {quotes} = await QuestradeController().getRealTimeQuotes(symbolId.symbols);

        const date = new Date();
        let currentTime = date.getTime()
        console.log(currentTime)
        
        // currentTime = parseISO(currentTime, new Date())
        // console.log(currentTime)
        currentTime = subDays(currentTime, 1)
        const formattedDate = format(currentTime, "yyyy-MM-dd'T'HH:mm:ss.SSSX")
        const startDate = format(startOfDay(currentTime), "yyyy-MM-dd'T'HH:mm:ss.SSSX")
        
        console.log(symbolId.symbols[0].symbolId, startDate, formattedDate)
        let recentData = await QuestradeController().getHistoricalData(symbolId.symbols[0].symbolId, startDate, "2021-01-05T011:08:32.931-05", "OneMinute")
        for (let item in recentData.candles){
            recentData.candles[item].start = recentData.candles[item].start.substring(11, 16)
        }
        res.send({quotes: quotes, recentData: recentData});

    } catch(err){ res.send({ error: "Error has occured"}) }
});


export default router;