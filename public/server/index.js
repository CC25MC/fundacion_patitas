'use strict';
(function () {
    const express = require('express');
    const path = require('path');
    const logger = require('morgan');
    const cookieParser = require('cookie-parser');
    const bodyParser = require('body-parser');

    const {dbinit} = require('./database/index');

    dbinit().then(console.log("db iniciada"));
   
    const animalRouter = require('./routes/animal');
    const vacunaRouter = require('./routes/vacuna');
    const trabajadorRouter = require('./routes/trabajador');
    const visitaRouter = require('./routes/visita');
    const aspiranteRouter = require('./routes/aspirante');
    const solicitudRouter = require('./routes/solicitud');

    const app = express();
    const publicPath = path.resolve(__dirname, '../dist');
    const port = 5000;

    // point for static assets
    app.use(express.static(publicPath));
    
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });
    

    //view engine setup
    app.set('views', path.join(__dirname, '../dist'));
    // app.engine('html', require('ejs').renderFile);
    // app.set('view engine', 'html');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended:true
    }));

    //app.use('/', routes);
    app.use('/api/animal', animalRouter);
    app.use('/api/vacuna', vacunaRouter);
    app.use('/api/trabajador', trabajadorRouter);
    app.use('/api/visita', visitaRouter);
    app.use('/api/aspirante', aspiranteRouter);
    app.use('/api/solicitud', solicitudRouter);
    app.use('/', function(req, res){
        res.json('Fundacion Patitas')
    });

    app.use(cookieParser());

    const server = app.listen(port, () => console.log(`Express server listening on port ${port}`));

    module.exports = app;

}());