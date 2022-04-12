const infosorteio = (prefix, pushname) => {
return`
Olá ${pushname} : Deseja saber como funciona os comandos de Sorteio? 

Existe 2 tipos de comando de sorteio. 

[1]- ${prefix}sorteio

[2]- ${prefix}sorteionumero

------------------------------

O comando ${prefix}sorteio ele sorteia um número aleatorio de alguém do grupo e fala que ele foi o sortudo. 

Coloque algo, após o comando sorteio, por exemplo, ${prefix}sorteio de 100 R$

-------------------------------

O comando ${prefix}sorteionumero ele envia números aleatorios de 1 a 257

Coloque algo, após o comando sorteio, por exemplo, ${prefix}sorteionumero de 100 R$

--------------------------------

Ideias desses 2 comandos, utilizar para sorteios em seu grupo, vamos supor que 257 pessoas do seu grupo faz uma lista de 1 a 257, e quer realizar um sorteio então vai ser utilizado em esses comando, sorteio por número de telefone ou por números. 

`
} 

exports.infosorteio = infosorteio