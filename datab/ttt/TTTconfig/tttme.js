const tttme = (pushname, userWins, userDefeats, userTies, userPoints) => {
  return `
「 🌀💮 Tic Tac Toe 💮🌀 」
by: Resen
❖ NOME: ${pushname} 

    ➣ Vitórias: ${userWins} 🎊
    ➣ Derrotas: ${userDefeats} 💥
    ➣ Empates : ${userTies} 🌀
    ➣ Pontos  : ${userPoints} ✨
    `
}

exports.tttme = tttme