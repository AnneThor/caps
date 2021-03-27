'use strict';

const events = require('./events.js');

events.on('pickup', pickup);
events.on('in-transit', inTransit);

function pickup(payload, event) {
  setInterval(() => {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    let event = { event: 'in-transit' }
    events.emit('in-transit', payload, event);
  }, 1000)
}

function inTransit(payload) {
  setInterval(() => {
    console.log(`DRIVER: delivered order ${payload.orderId}`);
    let event = { event: 'delivered' };
    events.emit('delivered', payload, event);
  }, 3000);
}
