'use strict';

require('../driver.js');
const faker = require('faker')
const events = require('../events.js');

describe("VENDOR functionality", () => {

  let payload = {
    storeName: 'Generic Store Name',
    orderId: faker.datatype.uuid(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress(),
  }

  let pickup = { event: 'pickup' };
  let inTransit = { event: 'in-transit' };

  let spy;

  beforeEach(()=> {
    jest.useFakeTimers();
  })

  afterEach(() => {
    jest.resetAllMocks();
  })

  test('that pickup emits an intransit signal', () => {
    events.emit('pickup', payload, pickup);
    spy = jest.spyOn(events, 'emit').mockImplementation();
    jest.advanceTimersByTime(5000*5);
    expect(spy).toHaveBeenCalled();
  })

  test('that pickup method logs correctly', () => {
    spy = jest.spyOn(console, 'log').mockImplementation();
    events.emit('pickup', payload, pickup);
    jest.advanceTimersByTime(5000*5);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`DRIVER: picked up ${payload.orderId}`);
  })

  test('that in-transit emits an delivered signal', () => {
    events.emit('in-transit', payload, inTransit);
    spy = jest.spyOn(events, 'emit').mockImplementation();
    jest.advanceTimersByTime(5000*5);
    expect(spy).toHaveBeenCalled();
  })

  test('that in-transit method logs correctly', () => {
    spy = jest.spyOn(console, 'log').mockImplementation();
    events.emit('in-transit', payload, inTransit);
    jest.advanceTimersByTime(5000*5);
    expect(spy).toHaveBeenCalled();
    // expect(spy).toHaveBeenCalledWith(`DRIVER: delivered order ${payload.orderId}`);
  })

})
