const Database = require('../db/config')

module.exports = {
  async create(req, res) {
    const db = await Database()
    const pass = req.body.password
    // Gera o ID da sala
    let roomId = ''
    let isRoom = true
    while (isRoom) {
      for (var i = 0; i < 6; i++) {
        roomId += Math.floor(Math.random() * 10).toString()
      }
      //Verifica se a sala já existe

      const roomsExistentIDs = await db.all(`SELECT id FROM rooms`)
      isRoom = roomsExistentIDs.some(
        roomExistentID => roomExistentID === roomId
      )
      if (!isRoom) {
        // Insere a sala no banco de dados
        await db.run(`INSERT INTO rooms (
          id,
          pass
        ) VALUES (
          ${parseInt(roomId)},
          "${pass}"
        )`)

        await db.close()

        res.redirect(`/sala/${roomId}`)
      }
    }
  },
  async open(req, res) {
    const db = await Database()
    const roomId = req.params.room

    const questions = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 0`
    )
    const questionsRead = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 1`
    )
    let isNoQuestions
    if (questions.length == 0) {
      if (questionsRead.length == 0) {
        isNoQuestions = true
      }
    } else {
      isNoQuestions = false
    }

    res.render('room', {
      roomId: roomId,
      questions: questions,
      questionsRead: questionsRead,
      isNoQuestions: isNoQuestions
    })
  },
  enter(req, res) {
    const roomId = req.body.roomId

    res.redirect(`/sala/${roomId}`)
  }
}
