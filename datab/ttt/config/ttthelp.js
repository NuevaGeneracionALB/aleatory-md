const ttthelp = (p) => {
    return `🔥 *JOGO DA VELHA* 🔥

Disponível apenas pra grupos

Como Jogar?

➻❥ *${p}ttt <dificuldade>*

DIFICULDADES:

easy: só joga pra se divertir

normal: 66% de chance 
de bloqueio e vitória

hard: 100% de chance 
de bloqueio e vitória 

impossible: NEM TENTA AMIGO

*INTERVALO:*

Só pode iniciar outro jogo após 2 minutos,
depois do jogo anterior ser iniciado,
A partida terminará, automaticamente 
após 2 minutos

MARCANDO AS COORDENADAS:
➻❥ *${p}coord <coordenada>*
EXEMPLO:
➻❥ ${p}coord a1


	🌀1️⃣2️⃣3️⃣
	🅰️❌🔲🔲
	🅱️🔲🔲🔲
	©️🔲🔲🔲

VENDO STATUS:
➻❥ *${p}tttme*

RECOMPENSAS:

MODO EASY:
Ganhou: + [ 25 / 50 ]
Perdeu: - [ 200 / 200 ]

MODO NORMAL
Ganhou: + [ 75 / 150 ]
Perdeu: - [ 75 / 150 ]

MODO HARD
Ganhou: + [ 200 / 400 ]
Perdeu: - [ 25 / 50 ]

MODO IMPOSSIBLE
Ganhou: + [ 1000 / 2000 」
Perdeu: - [ 0 / 0 」

JOGO EMPATADO

[ 0 / 0 ]

PARTIDA NÃO FINALIZADA

Perdeu: - [ 75 / 150 ]`
}

exports.ttthelp = ttthelp
