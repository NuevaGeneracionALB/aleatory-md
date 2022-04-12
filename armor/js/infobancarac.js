const infobancarac = (prefix, pushname) => {
return `
Olá ${pushname}

Um comando que criei, é exatamente assim:

com o comando 

${prefix}limitec você coloca o limite de caracteres que uma pessoa pode enviar no grupo, por exemplo um texto, se passar da quantidade que colocou, por exemplo, 3000, o bot vai remover, mas pra isso, depois de distinguir o limite, tem que ativar o comando por grupo que é :

${prefix}limitecaracteres 1 

1 é pra ativar, 0 pra desativar, ok? 

esse comando evitará que enviem trava de texto no seu grupo, pra o bot remover automaticamente, é isso aí.. 

Boa sorte.. 

`
}

exports.infobancarac = infobancarac