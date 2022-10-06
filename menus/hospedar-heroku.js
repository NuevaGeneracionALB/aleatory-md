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

Abre o termux >

Se nunca instalou esse comando no heroku, esse aqui olha, você dá ele no termux>

npm i -g npm@6 && npm i heroku -g

Ele demora um pouco, mas só esperar, e se a net cair vai ter que dá denovo kkkk.. 

DEPOIS... 

Da esse comando para acessar a conta criada do heroku

heroku login -i

Cola o e-mail, confirma

Depois coloca a senha e confirma. 


*Vamos acessar a pasta agora*

cd /sdcard/aleatory-md 

*Depois liga com*

node index

*E escaneia o qrcode, depois vai no WhatsApp do bot, no privado de alguém, e digita !Configurar-bot, configura e depois... 
aperta o volume de diminuir o som do celular e segura, e aperta letra C do teclado.*

No lugar do volume pode apertar ctrl se quiser também. 

*Vamos ao primeiro comando agora* >

*Edite primeiro os NOMEDOAPP*

*coloque um nome menusculo, e que não existe, por exemplo*

delicia126

Algum nome aleatório tlg? 

se existir ele vai da error de taken exists e etc.. 


1- Comando _

rm -rf .git && git init && git config --global --add safe.directory /storage/emulated/0/aleatory-md && heroku apps:create NOMEDOAPP && heroku buildpacks:add heroku/nodejs && heroku buildpacks:add https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest && heroku buildpacks:add https://github.com/clhuang/heroku-buildpack-webp-binaries.git && heroku git:remote -a NOMEDOAPP && git config --global user.email "tantofaz@gmail.com" && git config --global user.name "TantoFaz" && git add . && git commit -am "blabla" && git push heroku master 


Depois que editou  só copiar tudo isso e colar no terminal.. 

Essa parte é só isso.. 
_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

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
