import express from 'express';
import AlphaVantageController from '../../controller/AlphaVantageController'
import DailyTimeSeriesService from '../../database/DailyTimeSeries/service'
import CompanyOverviewService from '../../database/CompanyOverview/service'
import IncomeStatementService from '../../database/IncomeStatement/service'
import BalanceSheetService from '../../database/BalanceSheet/service'
import CashFlowService from '../../database/CashFlow/service'
import EarningsService from '../../database/Earnings/service'
import { formatDailyTimeSeries, formatResponse } from './function'

const router = express.Router();

// Retrieves historical data from the database
router.get('/:symbol', async (req, res, next) => {
    const symbol = req.params.symbol;
    console.log(symbol)
    try {
        // Retrieve data from the database baesd on stock symbol
        let [dailyTimeSeries] = await DailyTimeSeriesService.findBySymbol(symbol);
        let [companyOverview] = await CompanyOverviewService.findBySymbol(symbol);
        let [incomeStatement] = await IncomeStatementService.findBySymbol(symbol);
        // let [balanceSheet] = await BalanceSheetService.findBySymbol(symbol);
        // let [cashFlow] = await CashFlowService.findBySymbol(symbol);
        // let [earnings] = await EarningsService.findBySymbol(symbol);
    
        // Send an API call to alphavantage if dailyTimeSeries data is not present in the database
        if (!dailyTimeSeries){
            let controllerRes = await AlphaVantageController.getDailyTimeSeries(symbol);
            if (controllerRes){ 
                const object = formatDailyTimeSeries(controllerRes)
                dailyTimeSeries = await DailyTimeSeriesService.create(object)
            }
        }
        // Send an API call to alphavantage if companyOverview data is not present in the database
        if (!companyOverview){
            let controllerRes = await AlphaVantageController.getCompanyOverview(symbol);
            if (controllerRes){ 
                const object = formatResponse(controllerRes)
                companyOverview = await CompanyOverviewService.create(object);
                delete companyOverview._id;
                delete companyOverview.LastUpdated;
            }
        }
        // Send an API call to alphavantage if incomeStatement data is not present in the database
        if (!incomeStatement){
            let controllerRes = await AlphaVantageController.getIncomeStatement(symbol);
            if (controllerRes){ 
                const object = formatResponse(controllerRes)
                companyOverview = await IncomeStatementService.create(object);
                delete incomeStatement._id;
                delete incomeStatement.LastUpdated;
            }
        }
        // // Send an API call to alphavantage if balanceSheet data is not present in the database
        // if (!balanceSheet){
        //     let controllerRes = await AlphaVantageController.getBalanceSheet(symbol);
        //     if (controllerRes){ 
        //         const object = formatResponse(controllerRes)
        //         companyOverview = await BalanceSheetService.create(object);
        //         delete balanceSheet._id;
        //         delete balanceSheet.LastUpdated;
        //     }
        // }
        // // Send an API call to alphavantage if cashFlow data is not present in the database
        // if (!cashFlow){
        //     let controllerRes = await AlphaVantageController.getCashFlow(symbol);
        //     if (controllerRes){ 
        //         const object = formatResponse(controllerRes)
        //         companyOverview = await CashFlowService.create(object);
        //         delete cashFlow._id;
        //         delete cashFlow.LastUpdated;
        //     }
        // }
        // // Send an API call to alphavantage if earnings data is not present in the database
        // if (!earnings){
        //     let controllerRes = await AlphaVantageController.getEarning(symbol);
        //     if (controllerRes){ 
        //         const object = formatResponse(controllerRes)
        //         companyOverview = await EarningsService.create(object);
        //         delete earnings._id;
        //         delete earnings.LastUpdated;
        //     }
        // }

        const resData = {
            companyOverview: companyOverview,
            dailyTimeSeries: dailyTimeSeries.Array,
            incomeStatement: incomeStatement,
            // balanceSheet: balanceSheet,
            // cashFlow: cashFlow,
            // earnings: earnings,
        }

        res.send(resData);

    } catch(err){ res.send({ error: "Error has occured"}) }
});

router.get('/companyoverviews/all', async (req, res, next) => {
    try {
        let companyOverviews = await CompanyOverviewService.findAll();
        res.send(companyOverviews);

    } catch(err){ res.send({ error: "Error has occured"}) }
});


export default router;