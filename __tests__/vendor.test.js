'use strict';

const { makeOrders, thank } = require('../vendor.js');
const faker = require('faker')
const events = require('../events.js');

describe("VENDOR functionality", () => {

  let payload = {
    storeName: 'Generic Store Name',
    orderId: faker.datatype.uuid(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress(),
  }

  let delivered = { event: 'delivered' };

  let spy;

  beforeEach(()=> {
    jest.useFakeTimers();
  })

  afterEach(() => {
    jest.resetAllMocks();
  })

  test('the ORDER GENERATOR is properly making order objects', () => {
    makeOrders();
    spy = jest.spyOn(events, 'emit').mockImplementation();
    jest.advanceTimersByTime(5000*15);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(15);
  })

  test('that the THANK YOU function logs the correct information', () => {
    spy = jest.spyOn(console, 'log').mockImplementation();
    thank(payload);
    jest.advanceTimersByTime(5000);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(`VENDOR: Thank you for delivering ${payload.orderId}!`);
  })

})
