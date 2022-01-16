"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const index_js_1 = require("../../../models/index.js");
const index_js_2 = require("../../../lib/modules/index.js");
const discord_js_1 = require("discord.js");
exports.command = {
    name: "deletechannel",
    aliases: ["dc", "deletarcanal"],
    description: "Deleta o novo canal com seu id registrado.",
    run: async (client, message, args) => {
        try {
            //#region Embed/string[]
            let missingPermission = new discord_js_1.MessageEmbed()
                .setColor("#7b5bfc")
                .setTitle("**Você não tem permissão para usar esse comando.**")
                .setFooter({ text: "Permissão nivel Bufador." });
            let maxChannel = new discord_js_1.MessageEmbed()
                .setColor("#552bff")
                .setTitle("❌ Você não tem canais disponiveis ❌")
                .setDescription("Você não tem nem um servidor registrado com seu id. Por favor, use .createchannel(ou .cc) para criar um novo canal.");
            const levelBooster = [
                "929426173673500673",
                "929777206631223346",
                "929418031795408916", //"ADM" > brioco
            ];
            //#endregion
            //* 1 Checando se o usuario tem pelo menos uma das roles informadas abaixo.
            const checkAuthorBooster = new index_js_2.CheckRole(client, message.member, levelBooster);
            if (!checkAuthorBooster.CheckReturnBoolean())
                return message.channel.send({ embeds: [missingPermission] });
            //*3 Enviando uma mensagem de Loading até que todas as informações estejam carregadas
            let embedLoading = new discord_js_1.MessageEmbed()
                .setColor("#8f73ff")
                .setTitle("Carregando...");
            message.channel.send({ embeds: [embedLoading] }).then(async (loading) => {
                //* 4 Checando se o usuario já não tem canais registrados em seu id
                let channelExistCheck;
                let userBooster = await index_js_1.UserBoostModel.findOne({
                    userId: message.author.id,
                }).exec();
                let numberChannels;
                if (userBooster === null) {
                    const userBoosterdb = await new index_js_2.Databases().UserBoost(message.author.id);
                    if (!userBoosterdb)
                        throw "Erro ao criar o BDD dos bufadores.";
                    numberChannels = 0;
                }
                else {
                    channelExistCheck = message.guild.channels.cache.get(userBooster.idChannel);
                    if (!channelExistCheck) {
                        numberChannels = 0;
                    }
                    else {
                        numberChannels = userBooster.numberChannel;
                    }
                }
                if (numberChannels === 0)
                    return message.channel
                        .send({ embeds: [maxChannel] })
                        .then(async (m) => {
                        setTimeout(() => { if (m.deletable)
                            m.delete(); }, 15000);
                        await loading.delete();
                    });
                if (!channelExistCheck) {
                    await index_js_1.UserBoostModel.findOneAndUpdate({ userId: message.author.id }, { $set: { numberChannel: 0, idChannel: "123" } }).exec();
                }
                //#region Embed de confirmação
                let channelDeleteSucess = new discord_js_1.MessageEmbed()
                    .setTitle("**:white_check_mark: Canal exluido com sucesso :white_check_mark:**")
                    .setAuthor({
                    name: `${client.user.username}`,
                    iconURL: `${client.user.displayAvatarURL()}`,
                })
                    .setColor("#21c918")
                    .addField("Canal Exluido.", `Seu antigo canal de voz foi excluido com sucesso, para criar um novo use o comando **".cc {Nome do canal}"**.`);
                //#endregion
                //TODO:5 Deletando o canal e atualizando os dados no banco
                await loading.delete();
                message.channel
                    .send({ embeds: [channelDeleteSucess] })
                    .then(async () => {
                    await channelExistCheck.delete();
                    await index_js_1.UserBoostModel.findOneAndUpdate({ userId: message.author.id }, { $set: { numberChannel: 0, idChannel: "123" } }).exec();
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    },
};
