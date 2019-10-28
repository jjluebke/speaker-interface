const util = require('util')
const events = require('events')
const mpg = require('mpg123');
const moment = require('moment')

const player = new mpg.MpgPlayer()

const AlarmTones = {
  ADVENTURE  : 'adventure',
  DREAMS     : 'dreams',
  ELEVATE    : 'elevate',
  ONCEAGAIN  : 'onceagain',
  PERCEPTION : 'perception',
  RELAXING   : 'relaxing'
}

class Alarm {
  constructor() {
    events.EventEmitter.call(this);

    this.volume = 50
    this.armed = false
    this.time = moment()
    this.tone = AlarmTones.ADVENTURE
  }

  play() {
    console.log("play", this.audioFile)
    // player.play(`${__dirname}/audio/bensound-relaxing.mp3`)
  }

  getTime() {
    return this.time.unix()
  }

  setTime(time) {
    this.time = moment.unix(time)
  }
}

util.inherits(Alarm, events.EventEmitter);

module.exports.Alarm = Alarm;
module.exports.AlarmTones = AlarmTones;
