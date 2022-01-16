"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ms_1 = __importDefault(require("ms"));
async function Contador(client) {
    /*Puxando o servidor pelo id*/
    const guild = client.guilds.cache.get("929417995325956177");
    /*Setando o tempo em 10 minutos*/
    let time = (0, ms_1.default)("10m");
    /*Criando um temporizador para que a cada 10 minutos ele atualize o canal.*/
    setInterval(() => {
        /*Puxando a quantidade de membros no servidor*/
        let memberCount = guild.memberCount;
        /*Setando o canal que será editado com o numero de pessoas presentes no servidor*/
        const channel = guild.channels.cache.get("929442677701869588");
        /*Editando o nome do canal*/
        if (memberCount >= 1000) {
            let newCount = memberCount.toString();
            let arrayStringCount = newCount.split("");
            memberCount = `${arrayStringCount.slice(0, 2).join('.')}k`;
        }
        channel.setName(`👥┃Membros ━ᐅ ${memberCount}`);
    }, time);
}
exports.default = Contador;
