const cmd_termux = (prefix) => {
return `
SÓ DEVO LEMBRAR QUE O TERMUX DA PLAY STORE NÃO PRESTA, ENTÃO INSTALE O 118 POR LÁ 

> aleatoryapi.herokuapp.com 


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
`
}

exports.cmd_termux = cmd_termux
