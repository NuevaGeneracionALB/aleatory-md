const configbot = (prefixo) => {
return `
=== COMO PERSONALIZAR O BOT PARA SER O DONO ===

Primeiramente, ative o bot no termux ou onde for e vá para o WhatsApp do bot em uma conversa privada. Utilize os seguintes comandos:

--- Para alterar o nome do bot ---
${prefixo}nome-bot <Nome desejado>
Você pode usar letras modificadas também. 🙂

--- Apelido do Dono do Bot ---
${prefixo}nick-dono <Seu apelido>

--- Configurar o número do dono ---
${prefixo}numero-dono <Seu número>
O número deve ser digitado junto, sem o símbolo de + ou -, e sem o 9 da operadora. Deve ser idêntico ao seu número do WhatsApp.
    
Lembre-se, você deve utilizar o próprio WhatsApp e número do bot para configurar o número de dono, porque só ele é dono dele mesmo enquanto não for configurado.

--- Prefixo Do Bot ---
${prefixo}prefixo-bot &
Pode por qualquer símbolo, se o seu símbolo for ${prefixo} ele vai passar a ser & de acordo com o que você mudou.

--- TROCAR FOTO DO MENU ---
${prefixo}fotomenu
Apenas marque a foto que queres que seja do menu, com o comando.

Boa sorte.
`
}

exports.configbot = configbot
