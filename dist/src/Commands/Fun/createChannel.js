"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const index_js_1 = require("../../../models/index.js");
const index_js_2 = require("../../../lib/modules/index.js");
const discord_js_1 = require("discord.js");
exports.command = {
    name: "createchannel",
    aliases: ["cc", "criarcanal"],
    description: "Cria um novo canal com seu id registrado.",
    run: async (client, message, args) => {
        try {
            //#region Embed/string[]
            let missingPermission = new discord_js_1.MessageEmbed()
                .setColor("#7b5bfc")
                .setTitle("**Você não tem permissão para usar esse comando.**")
                .setFooter({ text: "Permissão nivel Bufador." });
            let missingName = new discord_js_1.MessageEmbed()
                .setTitle("**:bangbang: Por favor, insira um nome para seu canal :bangbang:**")
                .setColor("#f55142")
                .addField("Erro de sintaxe", "`Houve um erro de Sintaxe no comando, caso tenha duvida, siga a instrução abaixo:`")
                .addField("Exemplo de comando", "`.createChannel Meu canal foda` ou `.cc Meu canal foda`");
            let maxChannel = new discord_js_1.MessageEmbed()
                .setColor("#552bff")
                .setTitle("❌ Você não pode criar mais canais ❌")
                .setDescription("Cada bufador tem direito de criar apenas um canal por conta.");
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
            //*2 Configurando a viriavel para armazenar o nome do canal.
            const nameChannel = args.join(" ");
            if (nameChannel.trim() === "")
                return message.channel.send({ embeds: [missingName] }).then((m) => {
                    setTimeout(() => m.delete(), 15000);
                });
            //*3 Enviando uma mensagem de Loading até que todas as informações estejam carregadas
            let embedLoading = new discord_js_1.MessageEmbed()
                .setColor("#8f73ff")
                .setTitle("Carregando...");
            message.channel.send({ embeds: [embedLoading] }).then(async (loading) => {
                //* 4 Checando se o usuario já não tem canais registrados em seu id
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
                    const channelExistCheck = message.guild.channels.cache.get(userBooster.idChannel);
                    if (!channelExistCheck) {
                        numberChannels = 0;
                    }
                    else {
                        numberChannels = userBooster.numberChannel;
                    }
                }
                if (numberChannels === 1)
                    return message.channel
                        .send({ embeds: [maxChannel] })
                        .then(async (m) => {
                        setTimeout(() => m.delete(), 15000);
                        await loading.delete();
                    });
                //* 5 Registrando a categoria que os canais de bufadores ficam
                let category = message.guild.channels.cache.find((c) => c.id == "930225537354440805" && c.type == "GUILD_CATEGORY");
                if (category.type !== "GUILD_CATEGORY")
                    return;
                //* 6 Criando o canal do usuario
                message.guild.channels
                    .create(nameChannel, {
                    type: "GUILD_VOICE",
                    parent: category.id,
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ["VIEW_CHANNEL", "CONNECT"],
                        },
                        {
                            id: "929775168119783485",
                            allow: ["VIEW_CHANNEL"],
                        },
                        {
                            id: message.author.id,
                            allow: [
                                "VIEW_CHANNEL",
                                "CONNECT",
                                "MANAGE_ROLES",
                                "MANAGE_CHANNELS",
                                "SPEAK",
                                "MUTE_MEMBERS",
                            ],
                        },
                    ],
                })
                    .then(async (channell) => {
                    //* 7 Atualizando o banco de dados com as novas informações
                    await index_js_1.UserBoostModel.findOneAndUpdate({ userId: message.author.id }, { $set: { numberChannel: 1, idChannel: channell.id } }).exec();
                    //#region FinalEmbed
                    let embedSucess = new discord_js_1.MessageEmbed()
                        .setTitle(`**:white_check_mark: Canal criado com sucesso :white_check_mark:**`)
                        .setAuthor({
                        name: `${client.user.username}`,
                        iconURL: `${client.user.displayAvatarURL()}`,
                    })
                        .setDescription(`Seu canal "${nameChannel}" foi criado com sucesso, para **renomear**, **remover**, **adicionar** ou **remover membros** do seu canal, siga as instruções abaixo:`)
                        .setColor("#27db4b")
                        .addFields({
                        name: `:speech_balloon: Renomear seu canal:`,
                        value: `**.rc Canal loko**`,
                    }, { name: `:octagonal_sign: Deletar Canal:`, value: `**.dc**` }, {
                        name: `:green_circle: Adicionar membros:`,
                        value: `**.ua @Discord**`,
                    }, {
                        name: `:small_red_triangle_down: Remover Membros:`,
                        value: `**.ud @Discord**`,
                    })
                        .setFooter({ text: "Obrigado por impulsionar o servidor!❤" });
                    //#endregion
                    await loading.delete();
                    message.channel.send({ embeds: [embedSucess] }).then((msg) => {
                        setTimeout(() => {
                            if (msg.deletable) {
                                msg.delete();
                            }
                        }, 15000);
                    });
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    },
};
