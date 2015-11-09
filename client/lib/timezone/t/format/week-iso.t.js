require('proof')(14640, prove)

function prove (equal, tz, readDate) {
    var tz = require('timezone'), util = require('../util')
    var formatted, lines, line, i, I, date, dayOfYear, record
    formatted = __dirname + '/../data/format'
    lines = require('fs').readFileSync(formatted + '/V', 'utf8').split(/\n/)
    lines.pop()
    for (i = 0, I = lines.length; i < I; i++) {
        line = lines[i]
        record = line.split(/\s+/)
        date = record[0]
        dayOfYear = record[1]
        equal(tz(util.readDate(date), '%V'), dayOfYear, 'ISO week ' + date)
    }
}
