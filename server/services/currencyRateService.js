const rate = require('config').rate;
const axios = require('axios');
const moment = require('moment');

const configurationService = require('./configurationService');

module.exports.updateCurrencyRate = () => {
    if (rate.enabled) {
        configurationService.get().then(configuration => {
            if (!configuration.rate || moment().isAfter(configuration.rate.date)) {
                axios.get(`${rate.baseUrl}?access_key=${rate.accessKey}&symbols=${rate.symbols.join(',')}`)
                    .then(({data}) => {
                        if (data.success) {
                            configuration.rate = {
                                date: data.date,
                                base: data.base,
                                rates: data.rates
                            };

                            configurationService.update(configuration);
                        }
                    });
            }
        });
    }
};
