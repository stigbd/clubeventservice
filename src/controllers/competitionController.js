var Competition = require('../models/competition')

module.exports = {
  getCompetitions: function (req, res) {
    Competition.find({}, function (err, competitions) {
      if (err) {
        return res.sendStatus(500)
      }
      var competitionMap = {}
      competitions.forEach(function (competition) {
        var payload = {
          id: competition.id,
          name: competition.name,
          date: competition.date,
          multiRace: competition.multiRace
        }
        competitionMap[competition._id] = payload
      })
      res.send(competitionMap)
    })
  }
}
