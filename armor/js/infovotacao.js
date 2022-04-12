const infovotacao = (prefix, pushname) => {
return`

Olá ${pushname}

Comando: ${prefix}votação


Deseja saber sobre como funciona os comandos de votação?, é simples, você deve marcar uma pessoa junto a uma / e digitar uma frase como pergunta, e depois / e os minutos, 

Exemplo: ${prefix}votação @marca-pessoa/Vamos lanchar bolo hoje??/1  

para votar ou negar, tem que digitar sem prefixo:

voto ou devoto


1 que coloquei é 1 Minuto de votação, então faça exatamente, dessa fórma aí.

e também contêm o comando:

${prefix}delvote

ele anula sua votação.

`
}

exports.infovotacao = infovotacao