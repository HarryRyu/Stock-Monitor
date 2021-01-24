import StockListService from '../database/StockList/service';
import AlphaVantageController from '../controller/AlphaVantageManualController'
import { formatResponse, formatDailyTimeSeries }  from '../router/ResearchRouter/function'
import CompanyOverviewService from '../database/CompanyOverview/service'
import IncomeStatementService from '../database/IncomeStatement/service'
import BalanceSheetService from '../database/BalanceSheet/service'
import CashFlowService from '../database/CashFlow/service'
import EarningsService from '../database/Earnings/service'
import DailyTimeService from '../database/DailyTimeSeries/service'

const APIKeys = ['113FTC7HN8SMKBCY', 'MLEHC065XYOTVN46', 'EA15V1XI1PFQGRE4', 'TV8A43YRMIT1299T', '45SB86LBVIJH82CI'];
let iteration = 1;

export async function populateDailyTimeSeries(){
    const stockList = await StockListService.findAll();

    for (const stock in stockList){
        const companyExist = await DailyTimeService.findBySymbol(stockList[stock].Symbol);
        if (!companyExist.length){
            iteration++;
            saveDailySeries(stockList[stock].Symbol, iteration)
        }
        
        // check if stock already exist in company overview
        if (!(iteration % 6)){
            iteration = 1;
            console.log("I am pausing")
            // Wait 13 second
            await new Promise(resolve => {
                setTimeout(resolve, 60000)
            })
        }   
    }
}

async function saveDailySeries(symbol, iterations){    
    // if it does not exist, get stock info from alphavantage
    try {
        const dailyTimeSeries = await AlphaVantageController.getDailyTimeSeries(symbol, APIKeys[iterations % 4]);
        console.log("Symbol Saved: ", symbol)
        if (dailyTimeSeries["Meta Data"]){
            // If the response isn't empty, save it into the database
            const object = formatDailyTimeSeries(dailyTimeSeries)
            console.log(object)
            await DailyTimeService.create(object);
        }
    } catch(err){
        if (!err.Note){
            const object = {
                Symbol: symbol,
                LastUpdated: new Date(),
            }
            await DailyTimeService.create(object);
        }
        console.log(symbol, err)
    }
}

export async function populateCompanyOverviews(){
    // Find all stock lists
    const stockList = await StockListService.findAll();

    for (const stock in stockList){
        const companyExist = await CompanyOverviewService.findBySymbol(stockList[stock].Symbol);
        if (!companyExist.length){
            iteration++;
            saveCompanyOverview(stockList[stock].Symbol, iteration)
        }
        
        // check if stock already exist in company overview
        if (!(iteration % 6)){
            iteration = 1;
            console.log("I am pausing")
            // Wait 13 second
            await new Promise(resolve => {
                setTimeout(resolve, 60000)
            })
        }   
    }
}

async function saveCompanyOverview(symbol, iterations){    
    // if it does not exist, get stock info from alphavantage
    try {
        const companyOverview = await AlphaVantageController.getCompanyOverview(symbol, APIKeys[iterations % 4]);
        console.log("Symbol Saved: ", symbol)
        if (companyOverview.Symbol){
            // If the response isn't empty, save it into the database
            const object = formatResponse(companyOverview)
            await CompanyOverviewService.create(object);
        }
    } catch(err){
        if (!err.Note){
            const object = {
                Symbol: symbol,
                LastUpdated: new Date(),
            }
            await CompanyOverviewService.create(object);
        }
        console.log(symbol, err)
    }
}

export async function populateIncomeStatement(){
    // Find all stock lists
    const stockList = await StockListService.findAll();

    for (const stock in stockList){
        const companyExist = await IncomeStatementService.findBySymbol(stockList[stock].Symbol);
        if (!companyExist.length){
            iteration++;
            saveIncomeStatement(stockList[stock].Symbol, iteration)
        }
        
        // check if stock already exist in company overview
        if (!(iteration % 6)){
            iteration = 1;
            console.log("I am pausing")
            // Wait 13 second
            await new Promise(resolve => {
                setTimeout(resolve, 60000)
            })
        }   
    }
}

async function saveIncomeStatement(symbol, iterations){    
    // if it does not exist, get stock info from alphavantage
    try {
        const companyOverview = await AlphaVantageController.getIncomeStatement(symbol, APIKeys[iterations % 4]);
        console.log("Symbol Saved: ", symbol)
        console.log(companyOverview.annualReports[0])
        console.log(companyOverview.symbol)
        if (companyOverview.symbol){

            // If the response isn't empty, save it into the database
            console.log("HELLO")
            const object = formatResponse(companyOverview)
            console.log(object)
            await IncomeStatementService.create(object);
        }
    } catch(err){
        if (!err.Note){
            const object = {
                Symbol: symbol,
                LastUpdated: new Date(),
            }
            await IncomeStatementService.create(object);
        }
        console.log(symbol, err)
    }
}

export async function populateBalanceSheet(){
    // Find all stock lists
    const stockList = await StockListService.findAll();

    for (const stock in stockList){
        const companyExist = await BalanceSheetService.findBySymbol(stockList[stock].Symbol);
        if (!companyExist.length){
            iteration++;
            saveBalanceSheet(stockList[stock].Symbol, iteration)
        }
        
        // check if stock already exist in company overview
        if (!(iteration % 6)){
            iteration = 1;
            console.log("I am pausing")
            // Wait 13 second
            await new Promise(resolve => {
                setTimeout(resolve, 60000)
            })
        }   
    }
}

async function saveBalanceSheet(symbol, iterations){    
    // if it does not exist, get stock info from alphavantage
    try {
        const companyOverview = await AlphaVantageController.getBalanceSheet(symbol, APIKeys[iterations % 4]);
        console.log("Symbol Saved: ", symbol)
        if (companyOverview.Symbol){
            // If the response isn't empty, save it into the database
            const object = formatResponse(companyOverview)
            await BalanceSheetService.create(object);
        }
    } catch(err){
        if (!err.Note){
            const object = {
                Symbol: symbol,
                LastUpdated: new Date(),
            }
            await BalanceSheetService.create(object);
        }
        console.log(symbol, err)
    }
}

export async function populateCashFlow(){
    // Find all stock lists
    const stockList = await StockListService.findAll();

    for (const stock in stockList){
        const companyExist = await CashFlowService.findBySymbol(stockList[stock].Symbol);
        if (!companyExist.length){
            iteration++;
            saveCashFlow(stockList[stock].Symbol, iteration)
        }
        
        // check if stock already exist in company overview
        if (!(iteration % 6)){
            iteration = 1;
            console.log("I am pausing")
            // Wait 13 second
            await new Promise(resolve => {
                setTimeout(resolve, 60000)
            })
        }   
    }
}

async function saveCashFlow(symbol, iterations){    
    // if it does not exist, get stock info from alphavantage
    try {
        const companyOverview = await AlphaVantageController.getCashFlow(symbol, APIKeys[iterations % 4]);
        console.log("Symbol Saved: ", symbol)
        if (companyOverview.Symbol){
            // If the response isn't empty, save it into the database
            const object = formatResponse(companyOverview)
            await CashFlowService.create(object);
        }
    } catch(err){
        if (!err.Note){
            const object = {
                Symbol: symbol,
                LastUpdated: new Date(),
            }
            await CashFlowService.create(object);
        }
        console.log(symbol, err)
    }
}

export async function populateEarnings(){
    // Find all stock lists
    const stockList = await StockListService.findAll();

    for (const stock in stockList){
        const companyExist = await EarningsService.findBySymbol(stockList[stock].Symbol);
        if (!companyExist.length){
            iteration++;
            saveEarnings(stockList[stock].Symbol, iteration)
        }
        
        // check if stock already exist in company overview
        if (!(iteration % 6)){
            iteration = 1;
            console.log("I am pausing")
            // Wait 13 second
            await new Promise(resolve => {
                setTimeout(resolve, 60000)
            })
        }   
    }
}

async function saveEarnings(symbol, iterations){    
    // if it does not exist, get stock info from alphavantage
    try {
        const companyOverview = await AlphaVantageController.getEarning(symbol, APIKeys[iterations % 4]);
        console.log("Symbol Saved: ", symbol)
        if (companyOverview.Symbol){
            // If the response isn't empty, save it into the database
            const object = formatResponse(companyOverview)
            await EarningsService.create(object);
        }
    } catch(err){
        if (!err.Note){
            const object = {
                Symbol: symbol,
                LastUpdated: new Date(),
            }
            await EarningsService.create(object);
        }
        console.log(symbol, err)
    }
}
