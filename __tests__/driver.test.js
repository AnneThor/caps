'use strict';

const { pickup, intransit } = require('../driver.js');
const faker = require('faker')
const events = require('../events.js');

describe("VENDOR functionality", () => {

  let payload = {
    storeName: 'Generic Store Name',
    orderId: faker.datatype.uuid(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress(),
  }

  let pickupEvent = { event: 'pickup' };
  let inTransitEvent = { event: 'in-transit' };

  let spy;

  beforeEach(()=> {
    jest.useFakeTimers();
  })

  afterEach(() => {
    jest.resetAllMocks();
  })

  test('that pickup emits an intransit signal', () => {
    spy = jest.spyOn(events, 'emit').mockImplementation();
    pickup(payload, pickupEvent);
    jest.advanceTimersByTime(1000);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  })

  test('that pickup method logs correctly', () => {
    spy = jest.spyOn(console, 'log').mockImplementation();
    pickup(payload, pickupEvent);
    jest.advanceTimersByTime(1000);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`DRIVER: picked up ${payload.orderId}`);
  })

  test('that in-transit emits an delivered signal', () => {
    spy = jest.spyOn(events, 'emit').mockImplementation();
    intransit(payload, inTransitEvent);
    jest.advanceTimersByTime(3000);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  })

  test('that in-transit method logs correctly', () => {
    spy = jest.spyOn(console, 'log').mockImplementation();
    intransit(payload, inTransitEvent);
    jest.advanceTimersByTime(3000);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`DRIVER: delivered order ${payload.orderId}`);
  })

})
