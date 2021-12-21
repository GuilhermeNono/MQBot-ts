import { Command } from "@Interfaces";
import { CheckRole } from "@Modules";
import { Collection, GuildBan, GuildMember, MessageEmbed, User} from "discord.js";

export const command: Command = {
  name: "ban",
  aliases: ["bn", "banir"],
  description: "Comando para banir usuarios por tempo indeterminado.",
  run: async (client, message, args) => {
    try {
      //*1 - Verificando se o usuario tem o cargo necessario para usar esse comando

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
      const checkReturn: Boolean = newCheckAuthor.CheckReturnBoolean();

      //#region EmbedsMessages

      //Embed Tentativa de banir alguem superior
      let userCannotBeBan: MessageEmbed = new MessageEmbed()
        .setColor("#fa4848")
        .setDescription(
          "Você não pode punir esse usuario. Aparentemente, ele possui um alto cargo, e por conta disso, ele não poderá ser punido."
        )
        .setTitle("**Usuario de alto cargo**");

      //Embed Tentativa de auto-ban
      let autoBan: MessageEmbed = new MessageEmbed()
        .setColor("#69f542")
        .setDescription(
          "Você está tentando banir a si mesmo, e isso não faz o menor sentido."
        )
        .setTitle("**Você não pode se banir**");

      //Embed de falta de permissão

      let missingPermission: MessageEmbed = new MessageEmbed()
        .setColor("#fc3d03")
        .setTitle("**Você não tem permissão para usar esse comando.**")
        .setFooter("Permissão nivel administrador.");

      //Embed de erro na digitação

      let errorCode: MessageEmbed = new MessageEmbed()
        .setColor("#a268f2")
        .setTitle("**:warning: Erro de Sintaxe :warning:**")
        .setDescription(
          " Foi encontrado, no comando de banir usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: "
        )
        .addField("**:books: Comando de Ban |** ", "\u200b")
        .addFields(
          {
            name: ":purple_square:  Banir por Menção | ",
            value: "`.ban @Discord 1h Regra[1]`",
          },
          {
            name: ":purple_square:  Banir por ID | ",
            value: "`.ban 261945904829956097 1h Regra[1]`",
          }
        )
        .setFooter(
          "Usuario Invalido.",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Eo_circle_purple_letter-x.svg/1200px-Eo_circle_purple_letter-x.svg.png"
        )
        .setAuthor(
          "Pessego 🡻 ",
          "https://media.discordapp.net/attachments/776094611470942208/846246640867737610/peach_san.png?width=701&height=701"
        );

      //#endregion

      if (!checkReturn)
        return message.channel.send({ embeds: [missingPermission] });

      //*2 - Checando se o usuario foi mencionado; Checando se foi passado um parametro de texto ou não; Checando se o usuario existe

      let personCheck: Boolean = message.mentions.users.first() === undefined;

      if (args[0] === undefined || "")
        return message.channel.send({ embeds: [errorCode] });

      if (/^[a-zA-Z]+$/.test(args[0])) {
        return message.channel.send({ embeds: [errorCode] });
      }

      var person: GuildMember | User;

      if(!isNaN(parseInt(args[0]))){
        person = await client.users.fetch(args[0]);
      } else {
        person = personCheck
        ? message.guild.members.cache.get(args[0])
        : message.guild.members.cache.get(message.mentions.users.first().id);
      }

      if (!person) return message.channel.send("Usuario inexistente");

      //*3 - Impedindo com que o usuario tente banir a si mesmo
      if ((person.id) === message.author.id)
        return message.channel.send({ embeds: [autoBan] });

      // //*4 - Impedindo com que o usuario tente banir alguem com cargo superior ou equivalente ao seu

      if(!(person instanceof User)){
        const newCheckPerson: CheckRole = new CheckRole(
          message,
          listOfAllowedRoles,
          person
        );
  
        if (newCheckPerson.CheckReturnBoolean())
          return message.channel.send({ embeds: [userCannotBeBan] });
      }

      // //*5 - Armazenando o "motivo" da punição

      let reason: string = message.content.split(" ").splice(2).join(" ");
      if (reason === "") reason = "Indefinido";

      // //*6 - Checando se o usuario já foi banido
      let guildBans:Collection<string, GuildBan>  = await message.guild.bans.fetch();

      //TODO: Descobrir Por que não está retornando o valor real de banidos.
      if (guildBans.size === 0) {
        // await message.guild.members.ban(person);
        message.channel.send("Ninguem banido");
      } else {
        if (guildBans.findKey((userBan) => userBan.user.id === person.id)) {
          return message.react("❌");
        } else {
          // await message.guild.members.ban(person);
          message.channel.send("banido");
        }
      }
    } catch (error) {
      throw error;
    }
  },
};
