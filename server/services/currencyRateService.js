const rate = require('config').rate;
const axios = require('axios');
const moment = require('moment');

const configurationService = require('./configurationService');

module.exports.updateCurrencyRate = (forceUpdate) => {
    if (rate.enabled) {
        return configurationService.get().then(configuration => {
            if (!configuration.rate || moment().isAfter(configuration.rate.date) || forceUpdate) {
                return axios.get(`${rate.baseUrl}?access_key=${rate.accessKey}&symbols=${rate.symbols.join(',')}`)
                    .then(({data}) => {
                        if (data.success) {
                            configuration.rate = {
                                date: data.date,
                                base: data.base,
                                rates: data.rates
                            };

                            return configurationService.update(configuration);
                        }
                    });
            }
        });
    }
};
