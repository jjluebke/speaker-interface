import mpg from "mpg123"


let player = new mpg.MpgPlayer()

player.play(`${__dirname}/audio/bensound-relaxing.mp3`)