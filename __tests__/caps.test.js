'use strict';

const log = require('../caps.js');
const events = require('../events.js');
const faker = require('faker')

describe("CAPS functionality", () => {

  let payload = {
    storeName: 'Generic Store Name',
    orderId: faker.datatype.uuid(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress(),
  };

  let pickup = { 'event': 'pickup' };
  let inTransit = { 'event': 'in-transit' };
  let delivered = { 'event': 'delivered' };
  let spy;

  beforeEach(()=> {
    spy = jest.spyOn(console, 'log').mockImplementation();
  })

  afterEach(() => {
    jest.resetAllMocks();
  })

  test('that the log function logs when called on PICKUP', () => {
    log(payload, pickup);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  })

  test('that the log function logs when called on INTRANSIT', () => {
    log(payload, inTransit);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  })

  test('that the log function logs when called on DELIVERY', () => {
    log(payload, delivered);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  })

})
