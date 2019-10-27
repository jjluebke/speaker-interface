const util = require('util')
const bleno = require('@abandonware/bleno')

class AlarmArmedCharacteristic {
  constructor(alarm) {
    bleno.Characteristic.call(this, {
      uuid: '80b5c990-f7f5-11e9-8f0b-362b9e155667',
      properties: ['read', 'write'],
      descriptors: [
        new bleno.Descriptor({
          uuid: '2901',
          value: 'Arms/disarms the alarm.'
        })
      ]
    });
    this.alarm = alarm;
  }

  onWriteRequest(data, offset, withoutResponse, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG);
    }
    else if (data.length !== 1) {
      callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
    }
    else {
      var armed = data.readUInt8(0);
      this.alarm.armed = armed
      callback(this.RESULT_SUCCESS)
    }
  }
  
  onReadRequest(offset, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG, null);
    }
    else {
      var data = new Buffer(1);
      data.writeUInt8(this.alarm.armed, 0);
      callback(this.RESULT_SUCCESS, data);
    }
  }
}

util.inherits(AlarmArmedCharacteristic, bleno.Characteristic);

module.exports = AlarmArmedCharacteristic;