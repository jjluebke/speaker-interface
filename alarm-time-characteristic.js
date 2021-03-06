const util = require('util')
const bleno = require('@abandonware/bleno')

class AlarmTimeCharacteristic {
  constructor(alarm) {
    bleno.Characteristic.call(this, {
      uuid: 'a6762767-6ba3-44ca-bea7-2fcbdc55c5f1',
      properties: ['read', 'write'],
      descriptors: [
        new bleno.Descriptor({
          uuid: '2901',
          value: 'Gets or sets the alarm time.'
        })
      ]
    });
    this.alarm = alarm;
  }

  onWriteRequest(data, offset, withoutResponse, callback) {
    console.log("Date data")
    console.log(data)

    if (offset) {
      console.log('not long')
      callback(this.RESULT_ATTR_NOT_LONG);
    }
    else if (data.length !== 10) {
      console.log('not 10')
      callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
    }
    else {
      var time = data.toString('utf8');

      console.log('setting time')
      console.log('time:', time)
      
      this.alarm.setTime(time)
      callback(this.RESULT_SUCCESS)
      // callback(this.RESULT_UNLIKELY_ERROR);
    }
  }
  
  onReadRequest(offset, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG, null);
    }
    else {
      var data = new Buffer(10);
      data.write(this.alarm.getTime().toString());
      callback(this.RESULT_SUCCESS, data);
    }
  }
}

util.inherits(AlarmTimeCharacteristic, bleno.Characteristic);

module.exports = AlarmTimeCharacteristic;