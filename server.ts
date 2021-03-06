import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';
import * as bodyParser from 'body-parser';

import { RouterApiUser } from './src/backend/models/user/controller.route';
import { RouterApiUserPersonalData } from './src/backend/models/personal-data/controller.route';
import { RouterApiUserShippingAddress } from './src/backend/models/shipping-address/controller.route';
import { RouterApiUserReport } from './src/backend/models/report/controller.route';
import { RouterApiUserBilling } from './src/backend/models/billing/controller.route';
import { RouterApiUsersList } from './src/backend/models/list/controller.route';
import { RouterApiUserOrder } from './src/backend/models/order/controller.route';
import { RouterApiServices } from './src/backend/models/services/controller.route';




const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/extintoresuniversales");

var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('node_modules/browser-sync/certs/server.key'),
  cert: fs.readFileSync('node_modules/browser-sync/certs/server.crt'),
  requestCert: false,
  rejectUnauthorized: false
};

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.use(bodyParser.json());

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// - Example Express Rest API endpoints -
app.use('/', RouterApiUser);

app.use('/', RouterApiUserPersonalData);

app.use('/', RouterApiUserShippingAddress);

app.use('/', RouterApiUserReport);

app.use('/', RouterApiUserBilling);

app.use('/', RouterApiUsersList);

app.use('/', RouterApiUserOrder);

app.use('/', RouterApiServices);



// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// ALl regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

var server = https.createServer(options, app).listen(PORT, () => {
  console.log(`Node Express server listening on https://localhost:${PORT}`);
});
// Start up the Node server
