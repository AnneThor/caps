'use strict';

require('../caps.js');
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

  test('that the log function logs when called', () => {
    events.emit('delivered', payload, delivered);
    expect(spy).toHaveBeenCalled();
  })

  test('that the log function logs correctly on pickup', () => {
    events.emit('pickup', payload, pickup);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(3);
  })

})
