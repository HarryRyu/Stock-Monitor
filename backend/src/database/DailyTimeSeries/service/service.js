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
        const query = {Symbol: symbol};
        return new Promise((resolve, reject) => {
            model.find(query, {_id: 0}).lean()
            .then(res => resolve(res))
            .catch(err => reject(err))
        })
    },    
}

export default service;
