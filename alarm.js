const util = require('util')
const events = require('events')
const mpg = require('mpg123');
const moment = require('moment')
const schedule = require('node-schedule')

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

    this.armed = false
    this.scheduler = null
    this.time = moment()
    this.tone = AlarmTones.ADVENTURE
    this.volume = 50
  }

  play() {
    console.log("play", this.tone)
    player.play(`${__dirname}/audio/relaxing.mp3`)
  }

  stop() {
    console.log("stop")
    if(this.scheduler) {
      this.scheduler.cancel()
    }
    player.stop()
  }

  getTime() {
    return this.time.unix()
  }

  setTime(time) {
    this.time = moment.unix(parseInt(time))
    console.log("set time", this.time)
  }

  scheduleAlarm() {
    this.scheduler = schedule.scheduleJob(this.time.toDate(), this.play)
  }
}

util.inherits(Alarm, events.EventEmitter);

module.exports.Alarm = Alarm;
module.exports.AlarmTones = AlarmTones;
