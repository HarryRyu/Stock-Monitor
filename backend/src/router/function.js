import addDays from 'date-fns/addDays/index.js'
import isPast from 'date-fns/isPast/index.js'
import parseISO from 'date-fns/parseISO/index.js'
import format from 'date-fns/format/index.js'

export function fromDate(date){

    const dayArray = [];

    date = parseISO(date, new Date())
    while (isPast(date)){
        const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSX")
        dayArray.push(formattedDate);
        date = addDays(date, 1);

    }
    return dayArray;
}

export function formatHistoricalData(historicalData){
    for (let data in historicalData){
        historicalData[data].date = format(parseISO(historicalData[data].start), "yyyy-MM-dd")
        delete historicalData[data].start;
        delete historicalData[data].end;
    }
    return historicalData;
}