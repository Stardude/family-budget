const accountCtrl = require('./controllers/accountCtrl');
const categoryCtrl = require('./controllers/categoryCtrl');
const recordCtrl = require('./controllers/recordCtrl');
const configurationCtrl = require('./controllers/configurationCtrl');

module.exports = app => {
    app.use('/api/accounts', accountCtrl);
    app.use('/api/records', recordCtrl);
    app.use('/api/categories', categoryCtrl);
    app.use('/api/configuration', configurationCtrl);
};
