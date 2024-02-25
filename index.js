var anniversary = require('anniversary')
var round = require('round')

function shares (denominator, total) {
  return round.down((total * (1 / denominator)), 1)
}

function vesting (monthlyFraction, cliffFraction, cliffYears) {
  if (cliffFraction && cliffYears === undefined) {
    cliffYears = 1
  }
  return function (totalShares, startDate, lastWorkDay) {
    var cutoffDate = cliffYears
    ? anniversary(startDate, cliffYears)
    : startDate
    var cliffShares = cliffFraction
    ? shares(cliffFraction, totalShares)
    : 0
    var vestedShares = lastWorkDay >= cutoffDate
    ? cliffShares
    : 0
    var nonCliffShares = totalShares - cliffShares
    var remainingShares = nonCliffShares
    cutoffDate = new Date(
      cutoffDate.getFullYear(),
      cutoffDate.getMonth() + 1,
      1
    )
    var monthly = shares(monthlyFraction, nonCliffShares)
    while (lastWorkDay >= cutoffDate && remainingShares > 0) {
      var tranche = Math.min(monthly, remainingShares)
      vestedShares += tranche
      remainingShares -= tranche
      cutoffDate = new Date(
        cutoffDate.getFullYear(),
        cutoffDate.getMonth() + 1,
        1
      )
    }
    return vestedShares
  }
}

module.exports = vesting
