const database = require('./db');

module.exports = (sqlData) => {
    const db = database.get();

    return new Promise((resolve, reject) => {
        const callback = (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            }

            resolve(result);
        };

        const {query, method} = sqlData;
        console.log(query);

        switch (method) {
            case 'GET_MANY': db.all(query, callback); break;
            case 'GET_ONE': db.get(query, callback); break;
            case 'CUD': db.run(query, function (err) {
                if (err) {
                    console.error(err);
                    reject(err);
                }

                resolve(this);
            }); break;
        }
    });
};
