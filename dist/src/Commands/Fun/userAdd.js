"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const index_js_1 = require("../../../models/index.js");
const index_js_2 = require("../../../lib/modules/index.js");
const discord_js_1 = require("discord.js");
exports.command = {
    name: "useradd",
    aliases: ["ua", "adicionarusuario"],
    description: "Adiciona um novo usuario ao canal com seu id registrado.",
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
            const Embeds = new index_js_2.EmbedTemplates(client);
            const checkAuthorBooster = new index_js_2.CheckRole(client, message.member, levelBooster);
            if (!checkAuthorBooster.CheckReturnBoolean())
                return message.channel.send({ embeds: [missingPermission] });
            //*2 Pegando as informações do usuario informado
            //Checando se o argumento foi uma marcação.
            let personCheck = message.mentions.users.first() === undefined;
            //Checando se o argumento é um parametro vazio.
            if (args[0] === undefined || "")
                return message.channel.send({
                    embeds: [
                        Embeds.errorCode("Usuario Invalido.", "Foi encontrado, no comando de adicionar usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ", "tempmute", [
                            {
                                name: ":purple_square:  Adicionar usuario por Menção | ",
                                value: "`.ua @Discord`",
                            },
                            {
                                name: ":purple_square:  Adicionar usuario por ID | ",
                                value: "`.ua 261945904829956097`",
                            },
                        ]),
                    ],
                });
            //Checando se o argumento começa com letras.
            if (/^[a-zA-Z]+$/.test(args[0])) {
                return message.channel.send({
                    embeds: [
                        Embeds.errorCode("Usuario Invalido.", "Foi encontrado, no comando de adicionar usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ", "tempmute", [
                            {
                                name: ":purple_square:  Adicionar usuario por Menção | ",
                                value: "`.ua @Discord`",
                            },
                            {
                                name: ":purple_square:  Adicionar usuario por ID | ",
                                value: "`.ua 261945904829956097`",
                            },
                        ]),
                    ],
                });
            }
            let person;
            //Checando se o argumento informado é igual a um numero.
            if (!isNaN(parseInt(args[0]))) {
                //Checando se contem alguma letra em meio aos numeros.
                try {
                    person = message.guild.members.cache.find((memberID) => memberID.id === args[0]);
                }
                catch {
                    return message.channel.send({
                        embeds: [
                            Embeds.errorCode("Usuario Invalido.", "Foi encontrado, no comando de adicionar usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ", "tempmute", [
                                {
                                    name: ":purple_square:  Adicionar usuario por Menção | ",
                                    value: "`.ua @Discord`",
                                },
                                {
                                    name: ":purple_square:  Adicionar usuario por ID | ",
                                    value: "`.ua 261945904829956097`",
                                },
                            ]),
                        ],
                    });
                }
            }
            else {
                person = personCheck
                    ? message.guild.members.cache.get(args[0])
                    : message.guild.members.cache.get(message.mentions.users.first().id);
            }
            if (!person)
                return message.channel.send("Usuario inexistente");
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
                    await index_js_1.UserBoostModel.findOneAndUpdate({ userId: message.author.id }, { $set: { numberChannel: 0, idChannel: "123" } });
                }
                //* 5 Registrando a categoria que os canais de bufadores ficam
                if (channelExistCheck.type === "GUILD_VOICE") {
                    await channelExistCheck.permissionOverwrites.edit(person.id, {
                        SPEAK: true,
                        CONNECT: true,
                    });
                }
                await loading.delete();
                let userAddSucess = new discord_js_1.MessageEmbed()
                    .setTitle("**🔰 Usuario adicionado 🔰**")
                    .setAuthor({
                    name: `Peach`,
                    iconURL: "https://media.discordapp.net/attachments/776094611470942208/846246640867737610/peach_san.png",
                })
                    .setColor("#a142f5");
                message.channel
                    .send({ embeds: [userAddSucess] })
                    .then((msg) => setTimeout(() => msg.delete(), 15000));
            });
        }
        catch (error) {
            console.log(error);
        }
    },
};
