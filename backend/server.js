import app from './app.js';
import connectToDatabase from './src/database/mongoose.js'
import { populateCompanyOverviews, populateIncomeStatement, populateBalanceSheet, populateCashFlow, populateEarnings, populateDailyTimeSeries} from './src/manual/Manual'

connectToDatabase();

app.set('port', process.env.PORT || 5000);

const port = app.get('port');

//populateDailyTimeSeries();
const server = app.listen(port, () => {
    console.log(`Server is up at port ${port}`);
});


