const cmd_termux = (prefix) => {
return `
_-_-_-_-_-_-_-_-_

INSTALE O TERMUX, VERSÃO 119

https://www.mediafire.com/file/0npdmv51pnttps0/com.termux_0.119.1-119_minAPI21(arm64-v8a,armeabi-v7a,x86,x86_64)(nodpi)_apkmirror.com.apk/file

_-_-_-_-_-_-_-_-_-_

Comandos Básicos do termux, nescessario para inicialização do bot:


-_1 COMANDO :

termux-change-repo 

Confirma, marca a terceira caixinha e confirma e prossegue > 

-_2 COMANDO :

apt-get upgrade

Vai precisar digitar y e confirmar toda vez que pedir.

-_3 COMANDO :

apt-get update

Vai precisar digitar y e confirmar toda vez que pedir.

-_4 Comando :

pkg upgrade -y && pkg update -y && pkg install nodejs -y && pkg install nodejs-lts -y && pkg install ffmpeg -y && pkg install wget -y && pkg install git -y

-_5 COMANDO :

termux-setup-storage


E permite.



__-_-_-_-_-

COMANDO PRA INSTALAR A PASTA DO BOT, APÓS TUDO QUE JÁ FEZ :

___-_-_-_-_-

cd /sdcard && rm -rf aleatory-md && git clone https://github.com/NuevaGeneracionALB/aleatory-md.git && cd aleatory-md && sh start.sh  


_- SÓ BASTA COPIAR ELE TODO, E COLAR LÁ, NÃO É PRA COPIAR A METADE NEM UMA COISA SÓ, É TODO. 

`
}

exports.cmd_termux = cmd_termux
