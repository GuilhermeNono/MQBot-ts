import ExtendedClient from "@Client";
import { MessageEmbed, EmbedFieldData } from "discord.js";
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
  UserNotExist():MessageEmbed {
    return new MessageEmbed()
    .setColor("DARK_RED")
    .setTitle("🔺Usuario inexistente🔺")
    .setAuthor({
      name: `${this.client.user.username} 🡻 `,
      iconURL: `${this.client.user.displayAvatarURL()}`,
    });
  }

  AutoMute():MessageEmbed {
    return new MessageEmbed()
    .setTitle("Você não pode mutar a si proprio.")
    .setFooter({text:"Por que você tentaria algo tão idiota?"})
    .setColor("DARK_RED")
    .setAuthor({
      name: `${this.client.user.username} 🡻 `,
      iconURL: `${this.client.user.displayAvatarURL()}`,
    });
  }
}

export default EmbedTemplates;
