const util = require('util')
const bleno = require('@abandonware/bleno')

class AlarmVolumeCharacteristic {
  constructor(alarm) {
    bleno.Characteristic.call(this, {
      uuid: '322eb49c-f7f2-11e9-8f0b-362b9e155667',
      properties: ['read', 'write'],
      descriptors: [
        new bleno.Descriptor({
          uuid: '2901',
          value: 'Gets or sets the alarm volume.'
        })
      ]
    });
    this.alarm = alarm;
  }

  onWriteRequest(data, offset, withoutResponse, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG);
    }
    else if (data.length !== 2) {
      callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
    }
    else {
      var volume = data.readUInt8(0);
      if (volume >= 0 && volume <= 99) {
          this.alarm.volume = volume;
          callback(this.RESULT_SUCCESS);
          return
      }
      callback(this.RESULT_UNLIKELY_ERROR);
    }
  }
  
  onReadRequest(offset, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG, null);
    }
    else {
      var data = new Buffer(2);
      data.writeUInt8(this.alarm.volume, 0);
      callback(this.RESULT_SUCCESS, data);
    }
  }
}

util.inherits(AlarmVolumeCharacteristic, bleno.Characteristic);

module.exports = AlarmVolumeCharacteristic;