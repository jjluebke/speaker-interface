const util = require('util')
const bleno = require('@abandonware/bleno')


class PizzaToppingsCharacteristic {
  constructor(pizza) {
    bleno.Characteristic.call(this, {
      uuid: '13330002',
      properties: ['read', 'write'],
      descriptors: [
        new bleno.Descriptor({
          uuid: '2901',
          value: 'Gets or sets the pizza toppings.'
        })
      ]
    });
    this.pizza = pizza;
  }

  onWriteRequest(data, offset, withoutResponse, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG);
    }
    else if (data.length !== 2) {
      callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
    }
    else {
      this.pizza.toppings = data.readUInt16BE(0);
      callback(this.RESULT_SUCCESS);
    }
  }

  onReadRequest(offset, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG, null);
    }
    else {
      var data = new Buffer(2);
      data.writeUInt16BE(this.pizza.toppings, 0);
      callback(this.RESULT_SUCCESS, data);
    }
  }
}

util.inherits(PizzaToppingsCharacteristic, bleno.Characteristic);



module.exports = PizzaToppingsCharacteristic;