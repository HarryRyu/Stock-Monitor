const formatDailyTimeSeries = (controllerRes) => {
    const res = {
        Symbol: controllerRes["Meta Data"]["2. Symbol"],
        LastUpdated: controllerRes["Meta Data"]["3. Last Refreshed"],
        Array: [],
    }
    const timeSeries = controllerRes["Time Series (Daily)"];
    for (let series in timeSeries){
        res.Array.push({
            Date: series,
            Open: timeSeries[series]["1. open"], 
            Low: timeSeries[series]["2. high"], 
            High: timeSeries[series]["3. low"], 
            Close: timeSeries[series]["4. close"], 
            Volume: timeSeries[series]["5. volume"], 
        })
    }
    return res;
}

const formatResponse = (controllerRes) => {
    controllerRes.LastUpdated = new Date();
    for (let item in controllerRes){
        if (controllerRes[item] === 'None'){
            controllerRes[item] = undefined;
        }
        if (Array.isArray(controllerRes[item])){
            for (let itemTwo in controllerRes[item]){
                for (let itemThree in controllerRes[item][itemTwo]){
                    if (controllerRes[item][itemTwo][itemThree] === 'None'){
                        controllerRes[item][itemTwo][itemThree] = undefined;
                    }
                }
            }
        }
    }
    return controllerRes;
}

export { formatDailyTimeSeries, formatResponse }
