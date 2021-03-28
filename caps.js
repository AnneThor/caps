'use strict';

require('./driver.js');
require('./vendor.js');

const events = require('./events.js');

events.on('pickup', log);
events.on('in-transit', log);
events.on('delivered', log);

function log(payload, event) {
  let obj = {
    event: event,
    time: new Date().getTime().toString(),
    payload: payload
  }
  console.log("Event", obj)
}

module.exports = log;
