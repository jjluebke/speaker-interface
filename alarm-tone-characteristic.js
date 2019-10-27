const util = require('util')
const bleno = require('@abandonware/bleno')
const alarm = require('./alarm')

class AlarmToneCharacteristic {
  constructor(alarm) {
    bleno.Characteristic.call(this, {
      uuid: 'a78646a2-f7f6-11e9-8f0b-362b9e155667',
      properties: ['read', 'write'],
      descriptors: [
        new bleno.Descriptor({
          uuid: '2901',
          value: 'Gets or sets the tone of the alarm.'
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
      var tone = data.readUInt16BE(0);
      if (alarm.AlarmTones[tone]) {
          this.alarm.tone = tone;
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
      var data = new Buffer(1);
      data.writeUInt8(this.alarm.tone, 0);
      callback(this.RESULT_SUCCESS, data);
    }
  }
}

util.inherits(AlarmToneCharacteristic, bleno.Characteristic);

module.exports = AlarmToneCharacteristic;