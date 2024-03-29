// import express from 'express';
// import questradeController from '../controller/questradeController.js'
// import historicalDataService from '../database/historicalData.js/service/index.js'
// import { fromDate, formatHistoricalData } from './function.js'

// const stockRouter = express.Router();

// stockRouter.get('/:id', (req, res) => {
//     questradeController().getStock(req.params.id)
//     .then(stocks => res.send(stocks.data))
//     .catch(error => res.send(error));
// });

// stockRouter.get('/quote/:id', (req, res) => {
//     questradeController().getRealTimeQuote(req.params.id)
//     .then(quotes => res.send(quotes.data))
//     .catch(error => res.send(error))
// })

// stockRouter.get('/quote/:id/:startTime/:endTime/:interval', (req, res) => {
//     questradeController().getHistoricalData(req.params.id, req.params.startTime, req.params.endTime, req.params.interval)
//     .then(historicalData => res.send(historicalData.data))
//     .catch(error => res.send(error))
// })

// stockRouter.get('/save/:id/:startDate', async (req, res) => {
//     const stockIndex = req.params.id;
//     const dayArray = fromDate(req.params.startDate);
//     //for (let i = 0; i < dayArray.length - 1; i++){
//         //const startDate = dayArray[i];
//         //const endDate = dayArray[i + 1];
//         try {
//             let historicalData = await questradeController().getHistoricalData(stockIndex, dayArray[0], dayArray[dayArray.length - 1], "OneDay");
//             historicalData = formatHistoricalData(historicalData.data.candles);
//             console.log(historicalData)
//             historicalDataService().create(stockIndex, dayArray[0], dayArray[dayArray.length - 1], historicalData);
//             res.send(historicalData.data)
//         } catch(error) {
//             res.send(error)
//         }
//     //}
// })

// stockRouter.get('/getHistoricalData/:id', (req, res) => {
//     historicalDataService().findHistoricalData(req.params.id)
//     .then(historicalData => res.send(historicalData))
//     .catch(error => res.send(error))
// })


// export default stockRouter;