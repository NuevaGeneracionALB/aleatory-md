const infopalavrao = (prefix, pushname) => {
return `
Olá ${pushname}

Irei informar como funciona antipalavrão.. 

o antipalavrão é criado por você mesmo(a), "Como assim?", existe os seguintes comandos:

${prefix}addpalavra

${prefix}delpalavra

${prefix}antipalavrão

-------------------------------

primeiro, irei dá um exemplo: 

${prefix}addpalavra lixo

isso será incluído como um palavrão, "mas como faço isso funcionar agora?" 

você deve ativar a função por grupo, exemplo:

${prefix}antipalavrão 1  

1 é pra ativar, 0 pra desativar. 

e se você quer tirar a palavra de inclusão dos palavrões, é só digitar :

${prefix}delpalavra lixo

"lixo" é apenas a palavra que utilize como exemplo, mas você que tem que criar, e escolher quais frases não deseja que seja falada no seu grupo.

é isso aí, boa sorte..
`
}

exports.infopalavrao = infopalavrao