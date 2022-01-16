"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const index_js_1 = require("../../../lib/modules/index.js");
const discord_js_1 = require("discord.js");
exports.command = {
    name: "clear",
    aliases: ["cl", "clean", "limpar"],
    description: "Comando para limpar o chat.",
    run: async (client, message, args) => {
        try {
            //*1 Checando se o usuario tem permissão para limpar o char
            const rolesAgree = [
                "929426173673500673",
                "929418031795408916", //"ADM" > brioco
            ];
            const authorHighRole = new index_js_1.CheckRole(client, message.member, rolesAgree);
            const Embeds = new index_js_1.EmbedTemplates(client);
            if (!authorHighRole.CheckReturnBoolean())
                return message.channel.send({ embeds: [Embeds.missingPermission()] });
            //TODO: 2 Criando uma variavel para armazenar a quantidade de mensagens a serem apagadas
            if (!args[0])
                return message.channel.send({ embeds: [] });
            if (!parseInt(args[0])) {
                let NaNEmbed = new discord_js_1.MessageEmbed()
                    .setColor("DARK_RED")
                    .setTitle(`"${args[0]}" não é um numero.`);
                return message.channel.send({ embeds: [NaNEmbed] });
            }
            let qtd = parseInt(args[0]);
            if (qtd >= 100 || qtd < 0) {
                let numberGreaterThan99 = new discord_js_1.MessageEmbed()
                    .setColor("DARK_RED")
                    .setTitle("O numero não pode ser negativo ou maior que 99");
                return message.channel.send({ embeds: [numberGreaterThan99] });
            }
            //TODO: 3 Armazenando as mensagens referente a variavel qtd
            const fetched = await message.channel.messages.fetch({ limit: qtd + 1 });
            //TODO: 4 Apagando "qtd" mensagens do canal e enviando uma confirmação ou erro
            //Checando se existe mensagens para serem excluidas.
            if (fetched) {
                //Checando se o canal que será ecluida as mensagens é um canal de texto de servidor.
                if (message.channel.type === "GUILD_TEXT") {
                    //Deletando "fetched" mensangens
                    let msgEmbed = new discord_js_1.MessageEmbed().setColor("GREYPLE");
                    if (message.deletable)
                        await message.delete();
                    message.channel
                        .bulkDelete(fetched)
                        .then(async () => {
                        //Checando se foi informado um numero maior ou menos que 1
                        if (qtd <= 1) {
                            msgEmbed.setTitle(`${qtd} mensagem foi excluida! ✅`);
                            //Colocando a mensagem no singular caso seja apenas uma mensagem a ser excluida.
                            const msg = await message.channel.send({
                                embeds: [msgEmbed],
                            });
                            setTimeout(() => {
                                if (msg.deletable) {
                                    msg.delete();
                                }
                            }, 5000);
                        }
                        else {
                            msgEmbed.setTitle(`${qtd} mensagens foram excluidas! ✅`);
                            //Colocando a mensagem no plural caso sejam varias mensagens a serem excluidas.
                            const msg_1 = await message.channel.send({
                                embeds: [msgEmbed],
                            });
                            setTimeout(() => {
                                if (msg_1.deletable) {
                                    msg_1.delete();
                                }
                            }, 5000);
                        }
                    })
                        .catch(() => {
                        //Caso a exclusão das mensagens dê erro, isso pode significar que, as mensagens a serem excluidas tem 14 dias de tempo de envio.
                        const errorDelete = new discord_js_1.MessageEmbed()
                            .setColor("DARK_RED")
                            .setTitle("Não é possivel excluir mensagens de até 14 dias.");
                        return message.channel.send({ embeds: [errorDelete] });
                    });
                }
            }
        }
        catch (error) {
            await message.react("❌");
            console.log(`${error}`);
        }
    },
};
