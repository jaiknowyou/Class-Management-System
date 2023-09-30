const sequelize = require('./connection');

global.executePromisified = function (statement, parameters, transaction) {
    return new Promise(async function (resolve, reject) {
        try {
            let replacementArray = Array.isArray(parameters) ? parameters : [parameters];
            replacementArray = replacementArray.map((value) => (value === undefined ? null : value));
            const result = await sequelize.query(statement, {
                values: replacementArray,
                useMaster: true,
                transaction,
            });
            if (result && Array.isArray(result)) {
                let [rows] = result;
                return resolve(rows);
            }
            return resolve(result);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports