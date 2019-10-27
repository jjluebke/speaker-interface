const bleno = require('@abandonware/bleno')
const alarm = require('./alarm')
const AlarmService = require('./alarm-service')

const name = 'PositivelyAwake'
const alarmService = new AlarmService(new alarm.Alarm())

bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    bleno.startAdvertising(name, [alarmService.uuid], function(err) {
      if (err) {
        console.log(err)
      }
    })
  }
  else {
    bleno.stopAdvertising()
  }
})

bleno.on('advertisingStart', function(err) {
  if (!err) {
    console.log('advertising...')
    bleno.setServices([
      alarmService
    ])
  }
})
