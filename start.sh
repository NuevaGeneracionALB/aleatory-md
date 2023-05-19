#!/bin/bash

# Definindo cores
GREEN='\033[0;32m'

# Definindo o fuso horário para o Brasil
export TZ=America/Sao_Paulo

# Loop infinito
while true; do
    echo -e "${GREEN}Reconectando Aleatory 3.6 / Iniciando - $(date +'%d/%m/%Y %H:%M:%S')"
    
    # Executando o script Node.js
    node conect.js
    
    # Verificando o código de saída
    if [[ $? -eq 0 ]]; then
        echo -e "${GREEN}Script concluído com sucesso."
    else
        echo -e "${GREEN}Houve um erro ao executar o script."
    fi
    
    # Aguardando 1 segundo antes de reiniciar
    sleep 1
done
