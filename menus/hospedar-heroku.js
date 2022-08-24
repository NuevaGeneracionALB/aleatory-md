const hospedar = (prefix) => {
return `

COMO HOSPEDAR NO HEROKU...

SAIBA QUE DEVES DÁ OS COMANDOS BÁSICOS DO TERMUX, SENÃO NEM VENHA DÁ OS COMANDOS PRA LANÇAR PRO HEROKU :

E LEMBRANDO A TODOS :> O HEROKU NÃO ARMAZENA DADOS, ENTÃO DEVES DÁ TODOS OS COMANDOS DO BOT PRA ATIVAR FUNÇÕES, NO TERMUX, QUALQUER COISA NO HEROKU QUE ATIVAR, E ELE REINICIAR, TODAS AS COISAS QUE FOI ATIVADA VOLTARÁ PARA O PADRÃO, DE COMO FOI ENVIADO.

VIDEO DOS COMANDOS BÁSICOS :

[ https://youtu.be/OiWcm9INzXE ]

-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

PRIMEIRO, VOCÊ DEVE SE CADASTRAR NO HEROKU, APÓS AS AÇÕES ANTERIORES.

SITE : heroku.com

É CADASTRO BÁSICO, IGUAL QUALQUER SITE, SE NAO SABER FAZER ISSO, VAI SER DIFÍCIL SEGUIR EM DIANTE KKKKKK

-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

APÓS SE CADASTRAR NO HEROKU, VÁ ATÉ O TERMUX E DE OS SEGUINTES COMANDOS :

IREI PASSAR OS COMANDOS, PASSO A PASSO EM SEGUIDA..


heroku login -i


ESSE COMANDO ^ É PARA CONECTAR NA CONTA DO HEROKU, VOCÊ VAI INSERIR PRIMEIRO O EMAIL DA CONTA DO HEROKU, E DÁ ENTER, DEPOIS A SENHA, E CONFIRMAR COM ENTER...

ELE VAI CONECTAR.

Próximos comando :
 
1_ COMANDO :

cd /sdcard/aleatory-md 

1.2_ COMANDO :

node index

ESCANEIA O QRCODE COM O TESTE BETA ATIVADO, SE FOR A VERSÃO MULTI-DEVICE, ALEATORY - MD

1.3_ PASSO :

DEPOIS PRESSIONA O VOLUME DE DIMINUIR O VOLUME DO CELULAR, E APERTA A LETRA Z, APÓS ESCANEAR O QRCODE, E FAÇA OS PROCEDIMENTOS, ABAIXO, LEMBRE-SE DE CONFIGURAR O BOT ANTES, EXPLIQUEI LÁ ENCIMA O PORQUE.

1.4_ COMANDO :

rm -rf .git

2_ COMANDO :

git init

2.1 _COMANDO : 

git config --global --add safe.directory /storage/emulated/0/aleatory-md

3_ COMANDO :

heroku apps:create NOMEDOAPP

^ em NOMEDOAPP, coloque um nome seu, ou nick com numeração, pra ele aceitar, deve ser letra menuscula, lembre do nome.

-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

PRÓXIMOS COMANDOS :

4_ COMANDO :

heroku buildpacks:add heroku/nodejs

5_ COMANDO :

heroku buildpacks:add https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest

6_ COMANDO :

heroku buildpacks:add https://github.com/clhuang/heroku-buildpack-webp-binaries.git

_7 COMANDO :

heroku git:remote -a NOMEDOAPP

Em NOMEDOAPP você coloca o nome que colocou, que mandei criar, no primeiro que informei. 

_8 COMANDO :

git config --global user.email "tantofaz@gmail.com"
git config --global user.name "TantoFaz"

Cole exatamente dessa fórma, não precisa editar nada... 

_9 COMANDO :

git add . 

_10 COMANDO :

git commit -am "blabla"

_11 COMANDO :

git push heroku master

_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

PROXIMOS :

ENTRE NO SITE : heroku.com

ACESSE A SUA CONTA QUE CRIOU, ENTRE NO APP QUE FOI CRIADO, COMO ESSE LINK MOSTRA :

[ https://telegra.ph/file/5c2bc8d1290914de5ddc3.jpg ] 

-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_ 

DEPOIS QUE ENTRAR NO APP

ACESSE ESSA PARTE QUE ESTÁ O LINK ABAIXO MOSTRANDO O PRINT DA FOTO :

[ https://telegra.ph/file/7e3b3f6b8f0a04118c8ac.jpg ] 

-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

FAÇA IGUAL MOSTRADO NO PRINT, E ESCRITO.

LINK DO PRINT ATIVANDO O BOTÃO :

[ https://telegra.ph/file/e7538214885d688e4eb06.jpg ] 

-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

FAÇA COMO EXPLIQUEI PASSO A PASSO, SE MUDAR ATÉ UMA VIRGULA, OU UMA PONTUAÇÃO DO QUE ENSINEI, PODE DÁ ERROR, LEMBRANDO TAMBÉM QUE SE JÁ DEU OS COMANDOS BÁSICOS DO TERMUX, NÃO REPITA POIS PODERÁ CAUSAR BUG NO TERMUX, AE TERÁ QUE REFAZER TODOS COMANDOS BÁSICOS DO TERMUX.. 

-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

COMANDO PARA ATUALIZAR, CASO EDITAR ALGUMA INFORMAÇÃO, OU NOME DO BOT :

ACESSE A PASTA DO BOT COM :

_1 COMANDO :

cd /sdcard/aleatory-md 

_2 COMANDO :

sh heroku.sh

-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

`
}

exports.hospedar = hospedar
