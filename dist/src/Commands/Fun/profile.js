"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const index_js_1 = require("../../../lib/modules/index.js");
const index_js_2 = require("../../../models/index.js");
const canvas_1 = require("canvas");
const discord_js_1 = require("discord.js");
const path_1 = __importDefault(require("path"));
(0, canvas_1.registerFont)(path_1.default.join(__dirname, "..", "..", "Assets", "fonts/Montserrat-Black.ttf"), {
    family: "Montserrat",
});
exports.command = {
    name: "profile",
    aliases: ["pf"],
    run: async (client, message, args) => {
        try {
            //* 1 Procurando pelo usuario marcado, e se caso, não achar ou não existir, o retorno será o membro que enviou a mensagem.
            const Embeds = new index_js_1.EmbedTemplates(client);
            let person;
            //Checando se o argumento foi uma marcação.
            let personCheck = message.mentions.users.first() === undefined;
            //Checando se o argumento é um parametro vazio.
            if (args[0] === undefined || "")
                person = message.member;
            //Checando se o argumento começa com letras.
            if (/^[a-zA-Z]+$/.test(args[0])) {
                person = message.member;
            }
            //Checando se o argumento informado é igual a um numero.
            if (!isNaN(parseInt(args[0]))) {
                //Checando se contem alguma letra em meio aos numeros.
                try {
                    person = message.guild.members.cache.find((memberID) => memberID.id === args[0]);
                }
                catch {
                    person = message.member;
                }
            }
            else {
                person = personCheck
                    ? message.guild.members.cache.get(args[0])
                    : message.guild.members.cache.get(message.mentions.users.first().id);
            }
            if (!person)
                person = message.member;
            //*2 Enviando uma mensagem de Loading para o usuario que requisitou
            let embedLoading = new discord_js_1.MessageEmbed()
                .setColor("#03fc5e")
                .setTitle("Carregando...");
            message.channel.send({ embeds: [embedLoading] }).then(async (loading) => {
                //* 3 Procurando o maior cargo do usuario.
                const highMemberRole = message.guild.roles.cache.map((roles) => roles.id);
                const checkMemberRoles = new index_js_1.CheckRole(client, person, highMemberRole).CheckReturnId();
                let roleInfo = {
                    rolePosition: 0,
                };
                //* 4 Definindo a posição do usuario na hierarquia.
                for (let i in checkMemberRoles) {
                    const rolePosition = message.guild.roles.cache.find((role) => role.id === checkMemberRoles[i]);
                    if (roleInfo.rolePosition < rolePosition.position) {
                        roleInfo.rolePosition = rolePosition.position;
                        roleInfo.role = rolePosition;
                    }
                }
                //* 5 Definindo uma cor para a role conforme sua posição na hierarquia.
                if (roleInfo.rolePosition <= 6) {
                    roleInfo.roleColor = "#5ef016";
                }
                else if (roleInfo.rolePosition <= 14) {
                    roleInfo.roleColor = "#15edb7";
                }
                else if (roleInfo.rolePosition <= 18 || roleInfo.rolePosition >= 16) {
                    roleInfo.roleColor = "#a114e3";
                }
                else if (roleInfo.rolePosition >= 19) {
                    roleInfo.roleColor = "#e32222";
                }
                //*6 Criando uma variavel que armazene a data em que o usuario entrou no servidor
                let dateMemberJoinedAt = person.joinedAt;
                let strDateMember = dateMemberJoinedAt.toString().slice(0, 24);
                let strDate = strDateMember.slice(4);
                let dateMemberArray = strDate.split(" ");
                attDate(dateMemberArray);
                let dateMember = `${dateMemberArray[1]}/${dateMemberArray[0]}/${dateMemberArray[2]}`;
                let timeDate = dateMemberArray[3];
                //*7 Pegando as informações do banco do usuario.
                let userDB = await index_js_2.UserDataModel.findOne({ userId: person.id }).exec();
                if (userDB === null) {
                    //#region Embed
                    let databaseNotFound = new discord_js_1.MessageEmbed()
                        .setColor("#33f5ab")
                        .setTitle("**Registrei você em meu Banco!**")
                        .setDescription("Aparentemente, não tinha conseguido encontrar você em meu banco de dados. Então acabei de criar um novo com seu id registrado. Por favor, use o comando de novo para ver seu profile.")
                        .setFooter({ text: "Registro feito com sucesso" });
                    //#endregion
                    await new index_js_1.Databases().UserData(person.id);
                    return message.channel.send({ embeds: [databaseNotFound] });
                }
                const availableMutes = userDB.avbMutes;
                const mutesInAccount = userDB.countMute;
                //*8 Pegando a informação do avatar do membro.
                let memberAvatar = await (0, canvas_1.loadImage)(person.user.avatarURL({ format: "jpeg" }));
                //*9 Retornando o Canvas para o usuario
                message.delete().then(async () => {
                    await loading.delete();
                });
                message.channel.send({ files: [await MakeCanvas(dateMember, timeDate, roleInfo, availableMutes, mutesInAccount, memberAvatar)] });
            });
            async function MakeCanvas(dateMember, timeDate, roleinfo, availableMutes, mutes, memberAvatar) {
                const canvas = (0, canvas_1.createCanvas)(800, 450);
                const ctx = canvas.getContext("2d");
                const background = await (0, canvas_1.loadImage)(path_1.default.join(__dirname, "..", "..", "Assets", "/img/png/Profile_Card2_.png"));
                ctx.drawImage(background, 0, 0);
                ctx.textAlign = "left";
                ctx.font = "20px Montserrat Black";
                ctx.fillStyle = "#fff";
                if (person.nickname === null)
                    person.nickname = person.user.username;
                if (person.nickname.length > 10) {
                    if (person.nickname.length > 20) {
                        let personLength = person.nickname.length;
                        let nickLenghtRound = Math.round(personLength / 2);
                        let newNick = person.nickname.slice(nickLenghtRound);
                        ctx.fillText(`${person.nickname.slice(0, nickLenghtRound)} \n ${newNick}`, 15, 200);
                    }
                    else {
                        ctx.fillText(`${person.nickname}`, 0, 200);
                    }
                }
                else {
                    ctx.fillText(`${person.nickname}`, 46, 200);
                }
                //🎫| UserCard ➔ ${person.user.username} |🎫
                let personNewNick = person.user.username;
                ctx.textAlign = "center";
                ctx.font = "24px Montserrat Black";
                ctx.fillStyle = "#ffd2b3";
                ctx.fillText(`${personNewNick}`, 565, 30);
                //id
                ctx.textAlign = "center";
                ctx.font = "20px Montserrat Black";
                ctx.fillStyle = "#ffd2b3";
                ctx.fillText(`${person.id}`, 565, 50);
                //Coins
                let coin = await (0, canvas_1.loadImage)(path_1.default.join(__dirname, "..", "..", "Assets", "img/png/coin.png"));
                ctx.drawImage(coin, 480, 95, 50, 50);
                ctx.textAlign = "left";
                ctx.font = "25px Montserrat Black";
                ctx.fillStyle = "#ffd2b3";
                ctx.fillText(`1.000`, 530, 130);
                //Membro dês de
                ctx.textAlign = "center";
                ctx.font = "25px Montserrat Black";
                ctx.fillStyle = "#ffd2b3";
                ctx.fillText(`  ENTROU:`, 565, 210);
                ctx.textAlign = "center";
                ctx.font = "20px Montserrat Black";
                ctx.fillStyle = "#ffd2b3";
                ctx.fillText(`${dateMember} > ${timeDate}`, 565, 240);
                //Contador de Mutes
                ctx.textAlign = "left";
                ctx.font = "20px Montserrat Black";
                ctx.fillStyle = "#ffd2b3";
                ctx.fillText(`  MUTES/`, 660, 415);
                ctx.textAlign = "left";
                ctx.font = "20px Montserrat Black";
                ctx.fillStyle = `#ffd2b3`;
                ctx.fillText(`${mutes}`, 758, 415);
                //Cargo Principal
                ctx.textAlign = "center";
                ctx.font = "25px Montserrat Black";
                ctx.fillStyle = "#ffd2b3";
                ctx.fillText(`CARGO:`, 565, 320);
                ctx.textAlign = "center";
                ctx.font = "25px Montserrat Black";
                ctx.fillStyle = `${roleinfo.roleColor}`;
                // userHighRole = userHighRole.slice(2);
                // userHighRole = DetectLevel(userHighRole);
                ctx.fillText(`${roleinfo.role.name}`, 560, 350);
                //Mutes disponiveis
                let muteIcon = await (0, canvas_1.loadImage)(path_1.default.join(__dirname, "..", "..", "Assets", "img/png/mute.png"));
                ctx.textAlign = "center";
                ctx.font = "25px Montserrat Black";
                ctx.fillStyle = "#ffd2b3";
                ctx.drawImage(muteIcon, 725, 0, 40, 40);
                ctx.fillText(`/${availableMutes}`, 780, 30);
                //Avatar
                ctx.arc(90, 105, 60, 0, Math.PI * 2, true);
                ctx.strokeStyle = "#e54038";
                ctx.lineWidth = 6;
                ctx.stroke();
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(memberAvatar, 20, 30, 135, 135);
                return new discord_js_1.MessageAttachment(canvas.toBuffer(), `Profile_${person.user.id}_.png`);
            }
        }
        catch (error) {
            message.react("❌");
            console.log(error);
        }
    },
};
function attDate(date) {
    if (date[0] == "Jan") {
        let rpcr = date[0].replace(date[0], "01");
        return date.splice(0, 1, rpcr);
    }
    else if (date[0] == "Feb") {
        let rpcr = date[0].replace(date[0], "02");
        return date.splice(0, 1, rpcr);
    }
    else if (date[0] == "Mar") {
        let rpcr = date[0].replace(date[0], "03");
        return date.splice(0, 1, rpcr);
    }
    else if (date[0] == "Apr") {
        let rpcr = date[0].replace(date[0], "04");
        return date.splice(0, 1, rpcr);
    }
    else if (date[0] == "May") {
        let rpcr = date[0].replace(date[0], "05");
        return date.splice(0, 1, rpcr);
    }
    else if (date[0] == "Jun") {
        let rpcr = date[0].replace(date[0], "06");
        return date.splice(0, 1, rpcr);
    }
    else if (date[0] == "Jul") {
        let rpcr = date[0].replace(date[0], "07");
        return date.splice(0, 1, rpcr);
    }
    else if (date[0] == "Aug") {
        let rpcr = date[0].replace(date[0], "08");
        return date.splice(0, 1, rpcr);
    }
    else if (date[0] == "Sep") {
        let rpcr = date[0].replace(date[0], "09");
        return date.splice(0, 1, rpcr);
    }
    else if (date[0] == "Oct") {
        let rpcr = date[0].replace(date[0], "10");
        return date.splice(0, 1, rpcr);
    }
    else if (date[0] == "Nov") {
        let rpcr = date[0].replace(date[0], "11");
        return date.splice(0, 1, rpcr);
    }
    else if (date[0] == "Dec") {
        let rpcr = date[0].replace(date[0], "12");
        return date.splice(0, 1, rpcr);
    }
}
