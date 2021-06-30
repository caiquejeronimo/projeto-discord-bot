const express = require('express'),
app = express();

app.use(express.static('public'));

app.listen(process.env.PORT || 3000, () => console.log('Ambiente logado com sucesso!'));

const {Client, MessageAttachment} = require('discord.js'),
    client = new Client(),
    config = require('./config.json'),
    pokeQuiz = require('./src/js/pokequiz');
    
    client.on('ready', ()=>{
        console.log(`${client.user.tag}logado com sucesso!`);
    
    })

    client.on('message', msg =>{
        if(msg.content == `${config.prefix}pokequiz`){
            pokeQuiz(msg, MessageAttachment);
        }

        client.on('message', msg =>{
            if(msg.content == `${config.prefix}ficha`){
                ficha(msg, MessageAttachment);
            }
        })

    })

    client.on('message', msg => {
        if(msg.content === 'ping'){ //chamada simples de conteudo - resposta
            msg.reply('pong');
        }
            if(msg.content == 'duvido'){
                msg.reply('meu pau no seu ouvido');
            }
            if(msg.content == 'natal'){
                msg.reply('pega no meu pau');
            }
            if(msg.content == 'quem?'){
                msg.reply('te perguntou');
            }
            if(msg.content =='amizade'){
                msg.reply('é um país da Europa!');
            }


            if(msg.content == `${config.prefix}avatar`){ //pega o prefixo do config.json e aplica diretamente no conteudo da msg caso haja o prefixo
                msg.reply(msg.author.displayAvatarURL());
            } 
            if(msg.content == `${config.prefix}foto`){
                const attachment = new MessageAttachment(msg.author.displayAvatarURL());
                msg.channel.send(attachment); //ao inves de enviar a URL e visualizacao, envia a foto diretamente
            }
                
        }) 
    client.login(config.token);