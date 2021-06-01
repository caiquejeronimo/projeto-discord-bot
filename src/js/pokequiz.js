const config = require('../../config.json');
const axios = require('axios');
const { MessageAttachment, Message } = require('discord.js');

function formatName(str){
    let newStr = str.replace(/[_]/g, ' ');
    newStr = newStr.charAt(0).toUpperCase() + newStr.slice(1);
    return newStr;
}

module.exports = (msg, MessageAttachment) => {
    let number = Math.floor( (Math.random()* config.maxPokemon)+ 1);
    const header ={
        method: "get",
        url: config.endpoint + number

    }
    axios(header)
        .then((response) => {
            let res = response.data;
            let item = {
                "question": "Quem é este pokemon? *(Responda em 30 segundos)*",
                "answer":[`${formatName(res.name)}`]
            }

            const filter = response =>{
                return item.answer.some(answer => answer.toLowerCase() == response.content.toLowerCase());
            }

            msg.channel.send(item.question).then(()=>{
                const attachment = new MessageAttachment(res.sprites.front_default);
                msg.channel.send(attachment);
                msg.channel.awaitMessages(filter, { max: 1, time: 30000, erro: ['time'] })
                .then( collected =>{
                    msg.channel.send(`${collected.first().author} acertou a resposta!`)
                })
                .catch( collected =>{
                    msg.channel.send(`O nome dele é... ${item.answer}`);
                })
            })

        })
        .catch(error =>{
            console.log(error)
        })
    }