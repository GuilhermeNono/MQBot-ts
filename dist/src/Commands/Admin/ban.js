"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const index_js_1 = require("../../../lib/modules/index.js");
const discord_js_1 = require("discord.js");
exports.command = {
    name: "ban",
    aliases: ["b", "banir"],
    description: "Comando para banir usuarios por tempo indeterminado.",
    run: async (client, message, args) => {
        try {
            //PS: Inicializando os Embeds Templates.
            const Embeds = new index_js_1.EmbedTemplates(client);
            //*1 - Verificando se o usuario tem o cargo necessario para usar esse comando
            const memberAuthor = message.member;
            const newCheckAuthor = new index_js_1.CheckRole(client, memberAuthor);
            const checkReturn = newCheckAuthor.CheckHighRoleBool();
            if (!checkReturn)
                return message.channel.send({ embeds: [Embeds.missingPermission()] });
            //*2 - Checando se o usuario foi mencionado; Checando se foi passado um parametro de texto ou não; Checando se o usuario existe
            let personCheck = message.mentions.users.first() === undefined;
            if (args[0] === undefined || "")
                return message.channel.send({
                    embeds: [
                        Embeds.errorCode("Usuario Invalido.", "Foi encontrado, no comando de banir usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ", "ban", [
                            {
                                name: ":purple_square:  Banir por Menção | ",
                                value: "`.ban @Discord Regra[1]`",
                            },
                            {
                                name: ":purple_square:  Banir por ID | ",
                                value: "`.ban 261945904829956097 Regra[1]`",
                            },
                        ]),
                    ],
                });
            if (/^[a-zA-Z]+$/.test(args[0])) {
                return message.channel.send({
                    embeds: [
                        Embeds.errorCode("Usuario Invalido.", "Foi encontrado, no comando de banir usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ", "ban", [
                            {
                                name: ":purple_square:  Banir por Menção | ",
                                value: "`.ban @Discord Regra[1]`",
                            },
                            {
                                name: ":purple_square:  Banir por ID | ",
                                value: "`.ban 261945904829956097 Regra[1]`",
                            },
                        ]),
                    ],
                });
            }
            var person;
            if (!isNaN(parseInt(args[0]))) {
                //Checando se contem alguma letra em meio aos numeros.
                try {
                    person = await client.users.fetch(args[0]);
                }
                catch {
                    return message.channel.send({
                        embeds: [
                            Embeds.errorCode("Usuario Invalido.", "Foi encontrado, no comando de banir usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ", "tempban", [
                                {
                                    name: ":purple_square:  Banir temporariamente por Menção | ",
                                    value: "`.tempban @Discord 1h Regra[1]`",
                                },
                                {
                                    name: ":purple_square:  Banir temporariamente por ID | ",
                                    value: "`.tempban 261945904829956097 1h Regra[1]`",
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
            //*3 - Impedindo com que o usuario tente banir a si mesmo
            if (person.id === message.author.id)
                return message.channel.send({ embeds: [Embeds.autoBan()] });
            //*4 - Impedindo com que o usuario tente banir alguem com cargo superior ou equivalente ao seu
            if (!(person instanceof discord_js_1.User)) {
                const newCheckPerson = new index_js_1.CheckRole(client, person);
                if (newCheckPerson.CheckHighRoleBool())
                    return message.channel.send({
                        embeds: [Embeds.userCannotBePunished()],
                    });
            }
            //Impedindo com que o author da mensagem se auto-mute.
            if (person.id === message.author.id)
                return message.channel.send({ embeds: [Embeds.AutoMute()] });
            // *5 - Armazenando o "motivo" da punição
            let reason = message.content.split(" ").splice(2).join(" ");
            if (reason === "")
                reason = "Indefinido";
            //*6 Verificando se tem alguma imagem enviada pelo ADM
            let evidenceImage = message.attachments.first();
            let reasonEvidence = "Evidencia da punição 🡹";
            if (evidenceImage === undefined) {
                evidenceImage = 'https://saocarlosemrede.com.br/wp-content/uploads/2020/01/placeholder-1200x500-1.png';
                reasonEvidence = "Evidencia da punição não definida 🡹";
            }
            else {
                evidenceImage = evidenceImage.attachment;
            }
            // *7 - Checando se o usuario já foi banido
            let guildBans = await message.guild.bans.fetch();
            if (guildBans.size === 0) {
                await BanPerson(message, person, reason);
                FinalEmbed();
            }
            else {
                if (guildBans.findKey((userBan) => userBan.user.id === person.id)) {
                    return message.react("❌");
                }
                else {
                    await BanPerson(message, person, reason);
                    FinalEmbed();
                    //TODO: Criar um embed final.
                }
            }
            function FinalEmbed() {
                const publicChannel = message.guild.channels.cache.get("929441854469070949");
                const privateChannel = message.guild.channels.cache.get("929426733516615781");
                let gifEmbed = "https://centraldecursos.com/wp-content/uploads/2015/12/apresentacao-power-point.73.gif";
                if (publicChannel.type === "GUILD_TEXT" &&
                    privateChannel.type === "GUILD_TEXT") {
                    if (person instanceof discord_js_1.GuildMember)
                        publicChannel
                            .send({
                            embeds: [
                                Embeds.PublicDesc(message, reason, person, gifEmbed, "RED", "**:lock: Indeterminado**", "https://arquivosdedispositivosmoveis.files.wordpress.com/2013/05/anime-arquivos-de-dispositivos-mc3b3veis-one-piece.gif"),
                            ],
                        })
                            .then(async () => {
                            if (person instanceof discord_js_1.GuildMember)
                                privateChannel.send({
                                    embeds: [
                                        Embeds.PrivateDesc(message, person, reason, "__Ban__ ➟ 🔴", "**:lock: Indeterminado**", "RED", evidenceImage),
                                    ],
                                });
                            await message.delete();
                        });
                }
            }
        }
        catch (error) {
            throw error;
        }
    },
};
async function BanPerson(message, person, reason, days = 0) {
    try {
        //Banindo o usuario.
        await message.guild.members.ban(person, {
            reason: `${reason}`,
            days: days,
        });
        await message.react("☑️");
    }
    catch (error) {
        await message.react("❌");
        console.log(`${error}`);
    }
}
