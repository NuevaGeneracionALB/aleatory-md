#!/bin/bash
GREEN='\033[0;32m'
while : 
do
echo -e "${GREEN} Aleatory - Auto reconexão ativada para prevenção de quedas.."

if [ "$1" = "sim" ]; then
node iniciar.js sim
elif [ "$1" = "não" ]; then
node iniciar.js não
else 
node iniciar.js
fi

sleep 1
done
