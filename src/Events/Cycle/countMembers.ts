import ExtendedClient from '../../Client/index';
import { Client, Guild, GuildChannel, ThreadChannel } from 'discord.js';
//@ts-ignore
import ms from 'ms'

async function Contador(client:Client<true>): Promise<void> {
  /*Puxando o servidor pelo id*/
  const guild:Guild = client.guilds.cache.get("929417995325956177");
  /*Setando o tempo em 10 minutos*/
  let time:number = ms("10m");
  /*Criando um temporizador para que a cada 10 minutos ele atualize o canal.*/
  setInterval(() => {
    /*Puxando a quantidade de membros no servidor*/
    let memberCount:number | string = guild.memberCount;
    /*Setando o canal que será editado com o numero de pessoas presentes no servidor*/
    const channel:GuildChannel | ThreadChannel = guild.channels.cache.get("929442677701869588");
    /*Editando o nome do canal*/
    if(memberCount >= 1000) {
    let newCount:string = memberCount.toString() 
    let arrayStringCount:string[]= newCount.split("")
    memberCount = `${arrayStringCount.slice(0, 2).join('.')}k`
    }
    channel.setName(`👥┃Membros ━ᐅ ${memberCount}`);
  }, time);
}
export default Contador ;
