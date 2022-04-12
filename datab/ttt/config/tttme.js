const tttme = (pushname, userWins, userDefeats, userTies, userPoints) => {
  return `┏═══🔥*SEU STATUS*🔥═══┓
║ 
║ *User: ${pushname}* 
║
║ ➻❥ *Vitórias: ${userWins}* 
║ ➻❥ *Derrotas: ${userDefeats}*
║ ➻❥ *Empates : ${userTies}*
║ ➻❥ *Pontos  : ${userPoints}*
║
┗═══════════════════┛`
}

exports.tttme = tttme
