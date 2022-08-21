const infolistanegra = (prefix, pushname) => {
return `
Olá ${pushname} deseja saber como funciona o comando listanegra?, vamos lá. 

existe esses 2 comandos 

${prefix}listanegra

${prefix}tirardalista


--------------------------------

Como isso funciona? 

esse comando, por exemplo, se alguém envia algo no seu grupo, vamos supor, um link, e sai rápido, você vai digitar o seguinte 

${prefix}listanegra numero-junto-da-pessoa

vai colocar o número junto da pessoa que saiu, sem o + lembrando, e sem o -. 

pra remover ele da lista é simples:

${prefix}tirardalista numero-junto-da-pessoa

mesmos detalhes de add.. 

--------------------------------

é isso aí, boa sorte amigo..
`
}

exports.infolistanegra = infolistanegra