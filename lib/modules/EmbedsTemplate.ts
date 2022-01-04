import { MessageEmbed, EmbedFieldData } from "discord.js";
class EmbedTemplates {
  /**
   * ❌ - Tentativa de banir alguem com cargo superior.
   * @returns MessageEmbed()
   */
  userCannotBeBan(): MessageEmbed {
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
      .setFooter("Permissão nivel administrador.");
  }
  /**
   * ❌ - Erro de digitação
   * @returns MessageEmbed()
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
      .setFooter(
        `${errorType}`,
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Eo_circle_purple_letter-x.svg/1200px-Eo_circle_purple_letter-x.svg.png"
      )
      .setAuthor(
        "Pessego 🡻 ",
        "https://media.discordapp.net/attachments/776094611470942208/846246640867737610/peach_san.png?width=701&height=701"
      );
  }
}

export default EmbedTemplates;
