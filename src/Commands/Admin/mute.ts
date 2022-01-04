import { Command } from "@Interface";
import { CheckRole, EmbedTemplates } from "@Modules";
import { GuildMember } from "discord.js";
import { classicNameResolver } from "typescript";

export const command: Command = {
  name: "mute",
  aliases: ["mt"],
  description: "Comando para deixar o usuario mutado por tempo ilimitado.",
  run: async (client, message, args) => {
    try {
      //*1 Verificando se o usuario tem o cargo necessario para usar esse comando
      const memberAuthor: GuildMember = message.member;
      const listOfAllowedRoles: string[] = [
        "735147189432483920", //Role "Zé" > Peach Server
        "716006513818468404", //Role "MACACOS" > Muquifo
        "716008029396533349", //Role "FUNAI" > Muquifo
        "731199687981400097", //Role "MOD" > Muquifo
      ];
      const newCheckAuthor: CheckRole = new CheckRole(
        message,
        listOfAllowedRoles,
        memberAuthor
      );
      const Embeds = new EmbedTemplates();
      const checkReturn: Boolean = newCheckAuthor.CheckReturnBoolean();
      if (!checkReturn)
        return message.channel.send({ embeds: [Embeds.userCannotBeBan()] });
      //TODO: 2 Puxando as informações do membro e, verificando se o usuario não digitou errado e se o usuario pode ser punido.
      //TODO: 3 Criando uma variavel que armazene o motivo.
      //TODO: 4 Criando, definindo a posição do cargo na hierarquia e setando para cada canal do servidor a devida permissão do cargo.
      //TODO: 5 Adicionando o cargo de "Muted" no usuario mutado e criando os templates para as punições
      //TODO: 6 Atribundo o valor da função RandomPhrases para uma variavel
      //TODO: 7 Setando os canais publicos e privados, e por ultimo, adicionando um teporizador para retirar o cargo de "Muted" depois de um certo tempo.
    } catch (error) {}
  },
};
