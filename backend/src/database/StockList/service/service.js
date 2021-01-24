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
            model.find(query, {_id: 1}).lean()
            .then(res => resolve(res))
            .catch(err => reject(err))
        })
    },
    findByIds: (ids) => {
        const query = {_id: ids};
        return new Promise((resolve, reject) => {
            model.find(query, {Symbol: 1, _id: 0}).lean()
            .then(res => resolve(res))
            .catch(err => reject(err))
        })
    },
    findAll: () => {
        return new Promise((resolve, reject) => {
            model.find({}, {_id: 0}).lean()
            .then(res => resolve(res))
            .catch(err => reject(err))
        })
    }
}

export default service;
