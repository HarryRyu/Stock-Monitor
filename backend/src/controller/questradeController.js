import axios from 'axios';

const questradeUrl = "https://api05.iq.questrade.com/v1";
const refreshTokenURL = 'https://login.questrade.com';
let accessToken = '4uz0IzicEgGeSupjnQhQfr2Fl9DPD4hk0';
let refreshToken;


const questradeController = () => {
    const questradeAxios = axios.create({
        baseURL: questradeUrl,
        headers: { Authorization: `bearer ${accessToken}` },
    });

    const grantTypeHeader = {grant_type: 'refresh_token'};
    const refreshTokenHeader = {refresh_token: refreshToken}; 

    const refreshTokenAxios = axios.create({
        baseURL: refreshTokenURL,
        headers: { grantTypeHeader, refreshTokenHeader }
    });

    const controllerCalls = {
        getStock: (id) => {
            return new Promise((resolve, reject) => {
                questradeAxios.get(`/symbols/search?prefix=${id}`)
                .then(res => resolve(res.data))
                .catch(err => {
                    reject(err)
                });
            })
        }, 
        getStockBySymbol: (symbols) => {
            let req = ""
            for (let item in symbols) {
                req = req + symbols[item].Symbol + ","
            }
            req = req.slice(0,-1)
            return new Promise((resolve, reject) => {
                questradeAxios.get(`/symbols?names=${req}`)
                .then(res => resolve(res.data))
                .catch(err => {
                    reject(err)
                });
            })
        },
        getRealTimeQuotes: (ids) => {
            let req = ""
            for (let item in ids) {
                req = req + ids[item].symbolId + ","
            }
            req = req.slice(0,-1)
            return new Promise((resolve, reject) => {
                questradeAxios.get(`/markets/quotes?ids=${req}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
            })
        }, 
        getHistoricalData: (id, startTime, endTime, interval = "OneMinute") => {
            return new Promise((resolve, reject) => {
                questradeAxios.get(`/markets/candles/${id}?startTime=${startTime}&endTime=${endTime}&interval=${interval}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
            })
        },
        accessError: (call) => {
            return new Promise((resolve, reject) => {
                refreshTokenAxios.get('')
                .then(res => {
                    accessToken = res.access_token;
                    refreshToken = res.refresh_token;
                    resolve();
                })
                .catch(err => reject(err));
            })
        }
    }

    return controllerCalls;
}
export default questradeController;