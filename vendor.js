'use strict';

// 3rd party dependencies
require('dotenv').config();
const faker = require('faker')

// internal dependencies
const events = require('./events.js');

let storeName = process.env.STORE_NAME || `Generic Store`;

function orderGenerator() {
  setInterval( () => {
    let order = {
      storeName: storeName,
      orderId: faker.datatype.uuid(),
      customerName: faker.name.findName(),
      address: faker.address.streetAddress(),
    }
    let event = { event: 'pickup'}
    events.emit('pickup', order, event )
  }, 5000)
}

function thankYou(payload) {
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}!`);
}

events.on('delivered', thankYou)

orderGenerator();
