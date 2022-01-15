import ExtendedClient from "../../src/Client/index.js";
import { MessageEmbed, EmbedFieldData, ColorResolvable, Message, GuildMember, User } from "discord.js";
class EmbedTemplates {
  constructor(private client: ExtendedClient) {
    this.client = client;
  }
  /**
   * ❌ - Tentativa de banir alguem com cargo superior.
   * @returns MessageEmbed()
   */
  userCannotBePunished(): MessageEmbed {
    return new MessageEmbed()
      .setColor("#fa4848")
      .setDescription(
        "Você não pode punir esse usuario. Aparentemente, ele possui um alto cargo, e por conta disso, ele não poderá ser punido."
      )
      .setTitle("**Usuario de alto cargo**");
  }
  /**
   * ❌ - Tentativa de banir a si mesmo.
   * @returns MessageEmbed()
   */
  autoBan(): MessageEmbed {
    return new MessageEmbed()
      .setColor("#69f542")
      .setDescription(
        "Você está tentando banir a si mesmo, e isso não faz o menor sentido."
      )
      .setTitle("**Você não pode se banir**");
  }
  /**
   * ❌ - Aviso de que o usuario não tem permissão para efetuar essa ação.
   * @returns MessageEmbed()
   */
  missingPermission(): MessageEmbed {
    return new MessageEmbed()
      .setColor("#fc3d03")
      .setTitle("**Você não tem permissão para usar esse comando.**")
      .setFooter({ text: "Permissão nivel administrador." });
  }
  /**
   * ❌ - Erro de digitação
   * @returns MessageEmbed()
   * @param {String}errorType
   * @param {String}description
   * @param {String}commandName
   * @param {EmbedFieldData[]}fields
   */
  errorCode(
    errorType: String,
    description: String,
    commandName: String,
    fields: EmbedFieldData[]
  ): MessageEmbed {
    return new MessageEmbed()
      .setColor("#a268f2")
      .setTitle("**:warning: Erro de Sintaxe :warning:**")
      .setDescription(`${description}`)
      .addField(`**:books: Comando de ${commandName} |** `, "\u200b")
      .addFields(fields)
      .setFooter({
        text: `${errorType}`,
        iconURL:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Eo_circle_purple_letter-x.svg/1200px-Eo_circle_purple_letter-x.svg.png",
      })
      .setAuthor({
        name: "Pessego 🡻 ",
        iconURL: `${this.client.user.displayAvatarURL()}`,
      });
  }

  /**
   * ❌ - Erro na hora de definir o tempo.
   * @returns MessageEmbed()
   * @param {string | number} time
   */
  errorTime(time: string | number): MessageEmbed {
    return new MessageEmbed()
      .setTitle("**:warning: Erro de Sintaxe :warning:**")
      .setColor("#c5f542")
      .addField("Tempo Não definido.", `"${time}" não é um tempo valido.`);
  }

  /**
   * ❌ - Usuario inexistente.
   * @returns MessageEmbed()
   */
  UserNotExist(): MessageEmbed {
    return new MessageEmbed()
      .setColor("DARK_RED")
      .setTitle("🔺Usuario inexistente🔺")
      .setAuthor({
        name: `${this.client.user.username} 🡻 `,
        iconURL: `${this.client.user.displayAvatarURL()}`,
      });
  }

  AutoMute(): MessageEmbed {
    return new MessageEmbed()
      .setTitle("Você não pode mutar a si proprio.")
      .setFooter({ text: "Por que você tentaria algo tão idiota?" })
      .setColor("DARK_RED")
      .setAuthor({
        name: `${this.client.user.username} 🡻 `,
        iconURL: `${this.client.user.displayAvatarURL()}`,
      });
  }

  PrivateDesc(message:Message<boolean>, person: GuildMember, reason:string, typePunish:string, time:string, color:ColorResolvable, image?): MessageEmbed {
     
    let Embed:MessageEmbed = new MessageEmbed()
      .setTitle(`${person.user.tag}`)
      .setAuthor({name:message.author.username, iconURL:`${message.author.avatarURL()}`})
      .setThumbnail(
        "https://cdn-icons-png.flaticon.com/512/3094/3094851.png"
      )
      .setColor(color)
      .setDescription("**:clipboard: Informações do usuario:**")
      .addFields(
        {
          name: ":mega: Username | ",
          value: `${person.user.tag}`,
          inline: true,
        },
        {
          name: ":mute: Tipo de punição | ",
          value: `${typePunish}`,
          inline: true,
        },
        {
          name: ":stopwatch: Tempo de punição |",
          value: `${time}`,
          inline: true,
        },
        {
          name: ":bookmark_tabs: Motivo da punição | ",
          value: reason,
          inline: true,
        },
        {
          name: ":monkey: Punido por | ",
          value: `${message.author}`,
          inline: true,
        }
      )
      .setFooter({text:`id ➟ ${person.user.id}`});

      if(image) Embed.setImage(image);

      return Embed
  }

  PublicDesc(message:Message<boolean>, reason:string, person:GuildMember, gifThumbnail:string, color:ColorResolvable, time:string | number, gifCenter:string): MessageEmbed {
    //
    return new MessageEmbed()
      .setAuthor({
        name: message.author.username,
        iconURL: `${message.author.avatarURL()}`,
      })
      .setColor(color)
      .setDescription(`**:bookmark: Motivo da punição ➟ **${reason}`)
      .setThumbnail(
        gifThumbnail
      )
      .addField(
        ":speak_no_evil: Usuario Punido | ",
        `${person.user} 🡳 ${person.user.tag}`,
        true
      )
      .addField(
        ":timer: Tempo de Punição | ",
        "➟ " + `${time}`,
        true
      )
      .setImage(
        gifCenter
        
      )
      .setFooter({
        text: `➟ boo`,
        iconURL:
          "https://media.discordapp.net/attachments/776094611470942208/846246640867737610/peach_san.png?width=701&height=701",
      });
  }
}

export default EmbedTemplates;
