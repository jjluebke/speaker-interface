const util = require('util')
const bleno = require('@abandonware/bleno')

const AlarmVolumeCharacteristic = require('./alarm-volume-characteristic');
const AlarmArmedCharacteristic = require('./alarm-armed-characteristic');
const AlarmTimeCharacteristic = require('./alarm-time-characteristic');

function AlarmService(alarm) {
    bleno.PrimaryService.call(this, {
        uuid: '6084ded4-fb09-4a69-bbde-d00dd45b49e1',
        characteristics: [
            new AlarmVolumeCharacteristic(alarm),
            new AlarmArmedCharacteristic(alarm),
            new AlarmArmedCharacteristic(alarm),
            new AlarmTimeCharacteristic(alarm)
        ]
    });
}

util.inherits(AlarmService, bleno.PrimaryService);

module.exports = AlarmService;
