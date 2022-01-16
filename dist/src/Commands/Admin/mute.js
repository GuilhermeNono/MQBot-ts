"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const index_js_1 = require("../../../models/index.js");
const index_js_2 = require("../../../lib/modules/index.js");
const discord_js_1 = require("discord.js");
exports.command = {
    name: "mute",
    aliases: ["m", "mutar"],
    description: "Comando para deixar o usuario mutado por tempo ilimitado.",
    run: async (client, message, args) => {
        try {
            //*1 Verificando se o usuario tem o cargo necessario para usar esse comando
            const memberAuthor = message.member;
            const newCheckAuthor = new index_js_2.CheckRole(client, memberAuthor);
            const Embeds = new index_js_2.EmbedTemplates(client);
            const checkReturn = newCheckAuthor.CheckHighRoleBool();
            if (!checkReturn)
                return message.channel.send({
                    embeds: [Embeds.userCannotBePunished()],
                });
            //*2 Puxando as informações do membro, verificando se o usuario não digitou errado e se o usuario pode ser punido.
            //Checando se o argumento foi uma marcação.
            let personCheck = message.mentions.users.first() === undefined;
            //Checando se o argumento é um parametro vazio.
            if (args[0] === undefined || "")
                return message.channel.send({
                    embeds: [
                        Embeds.errorCode("Usuario Invalido.", "Foi encontrado, no comando de banir usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ", "ban", [
                            {
                                name: ":purple_square:  Banir por Menção | ",
                                value: "`.ban @Discord 1h Regra[1]`",
                            },
                            {
                                name: ":purple_square:  Banir por ID | ",
                                value: "`.ban 261945904829956097 1h Regra[1]`",
                            },
                        ]),
                    ],
                });
            //Checando se o argumento começa com letras.
            if (/^[a-zA-Z]+$/.test(args[0])) {
                return message.channel.send({
                    embeds: [
                        Embeds.errorCode("Usuario Invalido.", "Foi encontrado, no comando de banir usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ", "ban", [
                            {
                                name: ":purple_square:  Banir por Menção | ",
                                value: "`.ban @Discord 1h Regra[1]`",
                            },
                            {
                                name: ":purple_square:  Banir por ID | ",
                                value: "`.ban 261945904829956097 1h Regra[1]`",
                            },
                        ]),
                    ],
                });
            }
            var person;
            //Checando se o argumento informado é igual a um numero.
            if (!isNaN(parseInt(args[0]))) {
                //Checando se contem alguma letra em meio aos numeros.
                try {
                    person = await client.users.fetch(args[0]);
                }
                catch {
                    return message.channel.send({
                        embeds: [
                            Embeds.errorCode("Usuario Invalido.", "Foi encontrado, no comando de banir usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ", "ban", [
                                {
                                    name: ":purple_square:  Banir por Menção | ",
                                    value: "`.ban @Discord 1h Regra[1]`",
                                },
                                {
                                    name: ":purple_square:  Banir por ID | ",
                                    value: "`.ban 261945904829956097 1h Regra[1]`",
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
                return message.channel.send({ embeds: [Embeds.UserNotExist()] });
            /**
             * Checando se o tipo do usuario é diferente de "User".
             *
             * person: GuildMember = Está presente no servidor;
             * person: User = Não está presente no servidor.
             *
             */
            if (!(person instanceof discord_js_1.User)) {
                const newCheckPerson = new index_js_2.CheckRole(client, person);
                if (newCheckPerson.CheckHighRoleBool())
                    return message.channel.send({
                        embeds: [Embeds.userCannotBePunished()],
                    });
            }
            else {
                let userOutOfServer = new discord_js_1.MessageEmbed()
                    .setColor("DARK_RED")
                    .setTitle("Esse usuario não está no servidor.");
                return message.channel.send({ embeds: [userOutOfServer] });
            }
            //Impedindo com que o author da mensagem se auto-mute.
            if (person.id === message.author.id) {
                return message.channel.send({ embeds: [Embeds.AutoMute()] });
            }
            //*3 Criando uma variavel que armazene o motivo.
            let reason = message.content.split(" ").splice(2).join(" ");
            if (reason === "")
                reason = "Indefinido";
            //*4 Criando, definindo a posição do cargo na hierarquia e setando para cada canal do servidor a devida permissão do cargo.
            //Procurando o cargo no servidor.
            let muteRole = message.guild.roles.cache.find((role) => role.name === "Muted");
            //Procurando a quantidade de cargos no servidor.
            let cargos = await message.guild.roles
                .fetch()
                .then((roles) => {
                return roles.size;
            });
            //Subtraindo 2 posições na hierarquia de cargos.
            cargos -= 4;
            //Criando/setando o cargo "Muted" nos canais do servidor.
            if (!muteRole) {
                await message.guild.roles
                    .create({
                    name: "Muted",
                    reason: "Cargo para os mutados, quem tiver esse cargo não consegue enviar mensagens.",
                    permissions: ["VIEW_CHANNEL"],
                    position: cargos,
                    mentionable: false,
                })
                    .then((newRole) => {
                    message.guild.channels.cache.each((channels) => {
                        channels.permissionOverwrites.edit(newRole.id, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                        });
                    });
                    muteRole = newRole;
                });
            }
            else {
                message.guild.channels.cache.each((channels) => {
                    channels.permissionOverwrites.edit(muteRole.id, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                    });
                });
            }
            //*5 Adicionando o cargo de "Muted" no usuario mutado e criando os templates para as punições
            //Checando se o usuario já está mutado.
            const personAlreadyMuted = new index_js_2.CheckRole(client, person, [
                muteRole.id,
            ]);
            if (personAlreadyMuted.CheckReturnBoolean()) {
                let alreadyMuted = new discord_js_1.MessageEmbed()
                    .setColor("DARK_RED")
                    .setTitle("Esse usuario já está mutado.");
                return message.channel.send({ embeds: [alreadyMuted] });
            }
            //Adicionando o cargo "Muted" no usuario.
            person.roles.add(muteRole);
            //929426733516615781 idPunições > Priv
            //929441854469070949 Punições > Pub
            //*6 Setando os canasi publicos e privados.
            const publicChannel = message.guild.channels.cache.get("929441854469070949");
            const privateChannel = message.guild.channels.cache.get("929426733516615781");
            let gifEmbed = "https://i.pinimg.com/originals/62/59/87/62598722b7a66b461c06e75712b79132.gif";
            if (publicChannel.type === "GUILD_TEXT" &&
                privateChannel.type === "GUILD_TEXT") {
                publicChannel
                    .send({
                    embeds: [
                        Embeds.PublicDesc(message, reason, person, gifEmbed, "DARK_BLUE", "**:lock: Indeterminado**", "https://media.discordapp.net/attachments/776094611470942208/888405813687898132/tumblr_8eb6935c7349e6667f05e8af43aa174e_1dc8ac11_1280.gif"),
                    ],
                })
                    .then(async () => {
                    if (person instanceof discord_js_1.GuildMember)
                        privateChannel.send({
                            embeds: [
                                Embeds.PrivateDesc(message, person, reason, "__Mute__ ➟ 🔵", "**:lock: Indeterminado**", "DARK_BLUE"),
                            ],
                        });
                    await message.react("✅");
                });
            }
            //*7 Somando +1 no contador de mutes do usuario.
            try {
                let userDB = await index_js_1.UserDataModel.findOne({ userId: person.id }).exec();
                if (userDB === null) {
                    return await new index_js_2.Databases().UserData(person.id);
                }
                let userCountMute = userDB.countMute + 1;
                await index_js_1.UserDataModel.findOneAndUpdate({ userId: person.id }, { countMute: userCountMute }).exec();
            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            await message.react("❌");
            console.log(error);
        }
    },
};
//Lembrar de colocar o cargo da peach la pra cima dps.
