import model from '../model';

const service = {
    create: (object) => {
        return new Promise((resolve, reject) => {
            model.create(object)
            .then(res => resolve(res.toJSON()))
            .catch(err => reject(err))
        }
    )},
    findBySymbol: (symbol) => {
        const query = {symbol: symbol};
        return new Promise((resolve, reject) => {
            model.find(query, {_id: 0}).lean()
            .then(res => resolve(res))
            .catch(err => reject(err))
        })
    },
    findAll: () => {
        return new Promise((resolve, reject) => {
            model.find({}, {_id: 0, __v: 0}).lean()
            .then(res => resolve(res))
            .catch(err => reject(err))
        })
    },
    add: (watchlist, symbol) => {
        return new Promise((resolve, reject) => {
            model.updateOne({ Title: watchlist }, { $push: { List: symbol }})
            .then(res => resolve(res))
            .catch(err => reject(err))
        })
    }
}

export default service;
