const token = ""; //Token that you saved in step 5 of this tutorial

const { Intents } = require("discord.js");
const Discord = require('discord.js')
const Client = require('./src/structures/client')
const config = require("./config.json")

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.once("ready", () => {
    console.log('Bot em funcionamento, não se aproxime!')
    client.user.setActivity('Challenge 2023', {type: 'STREAMING'})
})

client.on("messageCreate", async message => {
    if(message.author.bot) return;
    if(message.channel.type === 'DM') return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g) //Captura tudo que vier após o primeiro espaço === ARGUMENTOS
    const comando = args.shift().toLowerCase(); //Captura só o que estiver antes do primeiro espaço === COMANDO

    const lenghtTitle = args[0].length;

    const comandoCompleto = message.content; //Captura todo o comando

    let comandoVerify = comandoCompleto.charAt(0)

    //const isAdmin = admsIds.includes(message.author.id)

    if(comandoVerify === '!') {
        validacao(comandoCompleto, message) ? comandoAnnouncement(comandoCompleto, message, lenghtTitle, args) : Notification(message)
        // if(isAdmin === true) {
        //     /* Caso a mensagem não seja validada ela é deletada, caso seja, o anúncio é concretizado */
            
        // } else {
        //     /* Usúario não identificado como um admin, desse modo, o anúncio não é enviado e a mensagem é deletada */
        //     message.delete();
        //     return
        // }
    }

    /* 
        *Quando o bot ler algo com !comando, ele sabe que qualque coisa que vier depois do espaço em seguida desse comando deve ser redigido à todos!
        *Comando básico "!comando {conteúdo_do_anúncio}"
    */
})

async function comandoAnnouncement(command, message, lenghtTitle, args) {
    //let conteudoAnuncio = command.slice(9); //Captura tudo que vier depois de "!comando " === ANUNCIO

    let conteudoAnuncio = command.slice(10 + lenghtTitle) //Captura tudo aquilo que vier depois de: "!anuncio [TITLE_HERE]"

    let title = args[0]

    const announcementEmbed = new Discord.MessageEmbed()
        .setColor('#00ffff')
        .setTitle(`${title}`)
        .setAuthor('Inteli BlockChainBot', 'https://imgur.com/Lt5vDHN.png', '')
        .setDescription(`${conteudoAnuncio}`)
        .setThumbnail('https://imgur.com/eBEY2VB.png')
        .setTimestamp()
    await client.channels.cache.get('732724643462512703').send({ embeds: [announcementEmbed] }); //message.channel.send({ embeds: [announcementEmbed] })
    message.delete()
    //Mensagem Embed criada
}

function validacao(command, message) {
    let conteudoAnuncio = command.slice(9); //Captura tudo que vier depois de "!comando " === ANUNCIO

    if (conteudoAnuncio === '' || conteudoAnuncio === null) { /* Valida se a mensagem enviada pelo autor contém algo dentro do conteudo do anuncio */
        return false
    } else {
        return true
    }
}

function Notification(message) {
    message.delete();
    message.author.send("Seu anúncio não foi enviado, pois ele estava vazio ou não passou em nossas verificações")
}

/* 

    UPDATE COM TÍTULO
        *args[0] === contém o título
        *dessa forma, o novo slice dentro do conteudoAnuncio deve conter os 9 já existentes
        *mais o args[0].lenght +1(por conta do espaço que vem em sua sequencia).
    FIM

*/


client.login(token)