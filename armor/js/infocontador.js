const infocontador = (prefix, pushname) => {
return`
Olá ${pushname} - 

Se você está lendo isso é porque está curioso(a) sobre o contador de mensagem de grupos. 

contém alguns comandos

-
(1) ${prefix}rankativos

(Descrição: Ele mostra os tops 5 com mais mensagem e comandos executados do bot, no grupo, mas essas mensagem, apenas serão contadas se o bot estiver ativo no termux, ele vai armazenar os dados de cada um que enviar mensagem.) 
 -      -      -       -       -       - 
 
 
 
-               
(2) ${prefix}atividades

(Descrição:  Este comando, ele mostra as atividades de todos os membros do grupo, mas devo lembrar novamente que só no termux que armazena os dados.)
-    -   -    -    -    -    -   -    -   -



-
(3) ${prefix}checkativo 

(Descrição: Esse comando, você deve marcar a pessoa, Exemplo: ${prefix}checkativo @marca-a-pessoa-do-gp, e assim como esse, é semelhante o aos outros 2.)
-   -   -   -   -   -   -   -   -   -   - 



(4) ${prefix}banghost

(Descrição: Preste muita atenção, este comando, você deve digitar ele, mais a quantidade de mensagem que é pra banir as pessoas que tiver abaixo daquela quantidade.

Exemplo: ${prefix}banghost 0 

ele vai banir todos aqueles que tiver com 0 mensagem, mas não digite este comando fora do termux (EXEMPLO: HOSPEDADO EM SITES, NÃO NO TERMUX, COMO FOSSE COMANDO, O COMANDO É PRA SER EXECUTADO NO WHATSAPP) , pois ele vai remover todos sem parar, que tiver 0 mensagem, já no termux, ele bane uma pessoa por comando, leia com atenção isso, pois não irei ser responsável por remover todos do seu grupo, por seus erros, recomendo deixar o bot on por 1 semana no grupo, pra usar esse comando, e banir aqueles que nunca enviou mensagem no grupo.)


(5) ${prefix}inativos 


Esse, ele vai te entregar os membros que estão com x mensagens definida por você, ou abaixo daquilo, exemplo: ${prefix}inativos 2
Todos com 2 mensagens ou menos, serão mostrado na lista... 

Má lembre, se colocou o bot agora, todos estarão zerado, pois não armazenou informações suficiente.
 `
}

exports.infocontador = infocontador