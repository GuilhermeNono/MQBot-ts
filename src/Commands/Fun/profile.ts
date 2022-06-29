import ExtendedClient from "../../Client/index";
import {
  Command,
  RoleProfile,
  TierOptions,
  InsigniaInfo,
  DBInfoServer
} from "../../interfaces/index";
import {
  CheckRole,
  Databases,
  EmbedTemplates,
} from "../../../lib/modules/index";
import { UserDataModel, insigniaDataModel } from "../../../models/index";
import { createCanvas, Image, loadImage, registerFont } from "canvas";
import {
  GuildMember,
  Message,
  MessageAttachment,
  MessageEmbed,
  Role,
} from "discord.js";
import path from "path";
import CanvasUI from "../../../lib/modules/Canvas";
registerFont(
  path.join(__dirname, "..", "..", "Assets", "fonts/Montserrat-Black.ttf"),
  {
    family: "Montserrat",
  }
);

export const command: Command = {
  name: "profile",
  isOff: false,
  aliases: ["pf"],
  run: async (
    client: ExtendedClient,
    message: Message<boolean>,
    args: string[]
  ) => {
    try {
      //* 1 Procurando pelo usuario marcado, e se caso, não achar ou não existir, o retorno será o membro que enviou a mensagem.

      const Embeds: EmbedTemplates = new EmbedTemplates(client);

      let person: GuildMember;

      //Checando se o argumento foi uma marcação.
      let personCheck: Boolean = message.mentions.users.first() === undefined;

      //Checando se o argumento é um parametro vazio.
      if (args[0] === undefined || "") person = message.member;

      //Checando se o argumento começa com letras.
      if (/^[a-zA-Z]+$/.test(args[0])) {
        person = message.member;
      }

      //Checando se o argumento informado é igual a um numero.
      if (!isNaN(parseInt(args[0]))) {
        //Checando se contem alguma letra em meio aos numeros.
        try {
          person = message.guild.members.cache.find(
            (memberID) => memberID.id === args[0]
          );
        } catch {
          person = message.member;
        }
      } else {
        person = personCheck
          ? message.guild.members.cache.get(args[0])
          : message.guild.members.cache.get(message.mentions.users.first().id);
      }

      if (!person) person = message.member;

      //*2 Enviando uma mensagem de Loading para o usuario que requisitou
      let embedLoading: MessageEmbed = new MessageEmbed()
        .setColor("#03fc5e")
        .setTitle("Carregando...");

      message.channel.send({ embeds: [embedLoading] }).then(async (loading) => {
        //* 3 Procurando o maior cargo do usuario.
        const highMemberRole: string[] = message.guild.roles.cache.map(
          (roles) => roles.id
        );

        const checkMemberRoles: string[] = new CheckRole(
          client,
          person,
          highMemberRole
        ).CheckReturnId();

        let roleInfo: RoleProfile = {
          rolePosition: 0,
        };

        //* 4 Definindo a posição do usuario na hierarquia.
        for (let i in checkMemberRoles) {
          const role: Role = message.guild.roles.cache.find(
            (role) => role.id === checkMemberRoles[i]
          );
          if (roleInfo.rolePosition < role.position) {
            roleInfo.rolePosition = role.position;
            roleInfo.role = role;
          }
        }

        const numberOfRoles: number = highMemberRole.length - 1;

        //* 5 Definindo uma cor para a role conforme sua posição na hierarquia.

        // let tierInfo: TierOptions = setTier(
        //   numberOfRoles,
        //   roleInfo.rolePosition
        // );

        // roleInfo.roleColor = tierInfo.color;

        //*6 Criando uma variavel que armazene a data em que o usuario entrou no servidor
        const date: string = person.joinedAt.toLocaleDateString("pt-br", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        const dateTime: string = person.joinedAt.toLocaleTimeString("pt-br", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        //*7 Pegando as informações do banco do usuario.

//#region Embed

let databaseNotFound: MessageEmbed = new MessageEmbed()
.setColor("#33f5ab")
.setTitle("**Registrei você em meu Banco!**")
.setDescription(
  "Aparentemente, não tinha conseguido encontrar você em meu banco de dados. Então acabei de criar um novo com seu id registrado. Por favor, use o comando de novo para ver seu profile."
)
.setFooter({ text: "Registro feito com sucesso" });

          //#endregion

        

        let userDB = await UserDataModel.findOne({ userId: person.id, serverId:message.guild.id}).exec();

        if (userDB === null) {
          await new Databases().UserData(person.id, person.guild.id);
          return message.channel.send({ embeds: [databaseNotFound] });
        }

        const availableMutes: number = userDB.avbMutes;
        const level: number = userDB.level;
        const xp: number = userDB.xp;
        const nextLevel: number = userDB.nextLevelXp;
        const mutesInAccount: number = userDB.countMute;  
        const balanceInAccout: string = userDB.balance;

        const primInsignia: number = userDB.primaryInsignia;
        const seconInsignia: number = userDB.secondaryInsignia;

        let primInsigniaInfo: InsigniaInfo = {
          insigniaID: 0,
          insigniaName: "Membro",
          insigniaURL: "https://i.imgur.com/ZEl17TJ.png",
        };

        let seconInsigniaInfo: InsigniaInfo = {
          insigniaID: 0,
          insigniaName: "Membro",
          insigniaURL: "https://i.imgur.com/ZEl17TJ.png",
        };

        let primInsigniaModel = await insigniaDataModel
          .findOne({ insigniaID: primInsignia, serverId: message.guild.id })
          .exec();
        if (primInsigniaModel == null) {
          console.log("Erro no modelo da insignia primaria.");
        } else {
          primInsigniaInfo = {
            insigniaID: primInsigniaModel.insigniaID,
            insigniaName: primInsigniaModel.insigniaName,
            insigniaURL: primInsigniaModel.insigniaURL,
          };
        }

        let seconInsigniaModel = await insigniaDataModel
          .findOne({ insigniaID: seconInsignia, serverId: message.guild.id  })
          .exec();
        if (seconInsigniaModel == null) {
          console.log("Erro no modelo da insignia secundaria.");
        } else {
          seconInsigniaInfo = {
            insigniaID: seconInsigniaModel.insigniaID,
            insigniaName: seconInsigniaModel.insigniaName,
            insigniaURL: seconInsigniaModel.insigniaURL,
          };
        }

        //*8 Pegando a informação do avatar do membro.

        let personAvatar = person.user.avatarURL({ format: "jpeg" });

        let memberAvatar: Image;

        try {
          memberAvatar = await loadImage(personAvatar);
        } catch {
          memberAvatar = await loadImage(
            "https://jsl-online.com/wp-content/uploads/2017/01/placeholder-user.png"
          );
        }

        //*9 Pegando a informação do dinheiro do usuario.

        //*10 Retornando o Canvas para o usuario
        if (loading.deletable) await loading.delete();

        let insigniaInfo = await insigniaDataModel.findOne({insigniaID:primInsigniaInfo.insigniaID}).exec();
        let primaryInsigniaBoost = Number(insigniaInfo.xpBoost);
        insigniaInfo = await insigniaDataModel.findOne({insigniaID:seconInsigniaInfo.insigniaID}).exec();
        let secondaryInsigniaBoost = Number(insigniaInfo.xpBoost);

        let xpBoost = primaryInsigniaBoost + secondaryInsigniaBoost;
        xpBoost = parseFloat((0 + (1 * xpBoost)).toFixed(1));

              
      const canvasUI = new CanvasUI(450,800);
      // const profileCanvas = await canvasUI.CanvasProfile(); 

      //   message.channel.send({
      //     files: [
      //       profileCanvas,
      //     ],
      //   });
      });


    //  await MakeCanvas(
    //           date,
    //           xpBoost,
    //           primInsigniaInfo,
    //           seconInsigniaInfo,
    //           dateTime,
    //           roleInfo,
    //           availableMutes,
    //           mutesInAccount,
    //           balanceInAccout,
    //           memberAvatar,
    //           level,
    //           xp,
    //           nextLevel,
    //           tierInfo
    //         )
      //TODO Mover a criação do canvas para a classe "CanvasUi" para seu devido metodo.


      // async function MakeCanvas(
      //   dateMember: string,
      //   xpBoost: number,
      //   primInsignia: InsigniaInfo,
      //   seconInsignia: InsigniaInfo,
      //   timeDate: string,
      //   roleinfo: RoleProfile,
      //   availableMutes: number,
      //   mutes: number,
      //   balance: string,
      //   memberAvatar: Image | string,
      //   level: number,
      //   xp: number,
      //   nextLevelXp: number,
      //   tierInfo: TierOptions
      // ) {
      //   const canvas = createCanvas(800, 450);
      //   const ctx = canvas.getContext("2d");

      //   const background = await loadImage(
      //     path.join(
      //       __dirname,
      //       "..",
      //       "..",
      //       "Assets",
      //       "/img/png/Profile_Card4_.png"
      //     )
      //   );
      //   ctx.drawImage(background, 0, 0);

      //   ctx.textAlign = "center";
      //   ctx.font = "20px Montserrat Black";
      //   ctx.fillStyle = "#fff";

      //   if (person.nickname === null) person.nickname = person.user.username;
      //   if (person.nickname.length > 10) {
      //     if (person.nickname.length >= 16 && person.nickname.length <= 18) {
      //       ctx.fillText(`${person.nickname}`, 110, 200);
      //     } else if (
      //       person.nickname.length > 18 &&
      //       person.nickname.length <= 26
      //     ) {
      //       let personLength = person.nickname.length;
      //       let nickLenghtRound = Math.round(personLength / 2);
      //       let newNick = person.nickname.slice(nickLenghtRound);
      //       ctx.fillText(
      //         `${person.nickname.slice(0, nickLenghtRound)} \n ${newNick}`,
      //         90,
      //         200
      //       );
      //     } else {
      //       let personLength = person.nickname.length;
      //       let nickLenghtRound = Math.round(personLength / 2);
      //       let newNick = person.nickname.slice(nickLenghtRound);
      //       ctx.fillText(
      //         `${person.nickname.slice(0, nickLenghtRound)} \n ${newNick}`,
      //         105,
      //         200
      //       );
      //     }
      //   } else {
      //     ctx.fillText(`${person.nickname}`, 85, 200);
      //   }

      //   //🎫| UserCard ➔ ${person.user.username} |🎫

      //   let personNewNick = person.user.username;
      //   ctx.textAlign = "center";
      //   ctx.font = "24px Montserrat Black";
      //   ctx.fillStyle = "#ffd2b3";
      //   ctx.fillText(`${personNewNick}`, 565, 30);

      //   //id
      //   ctx.textAlign = "center";
      //   ctx.font = "20px Montserrat Black";
      //   ctx.fillStyle = "#ffd2b3";
      //   ctx.fillText(`${person.id}`, 565, 50);

      //   //Coins

      //   let coin: Image = await loadImage(
      //     path.join(__dirname, "..", "..", "Assets", "img/png/coin.png")
      //   );

      //   ctx.drawImage(coin, 495, 295, 50, 50);

      //   ctx.textAlign = "left";
      //   ctx.font = "25px Montserrat Black";
      //   ctx.fillStyle = "#ffd2b3";
      //   const newBalance = parseFloat(balance).toFixed(2);
      //   ctx.fillText(`${newBalance}`, 545, 333);

      //   //Membro dês de
      //   ctx.textAlign = "center";
      //   ctx.font = "25px Montserrat Black";
      //   ctx.fillStyle = "#ffd2b3";
      //   ctx.fillText(`  ENTROU:`, 565, 210);

      //   ctx.textAlign = "center";
      //   ctx.font = "20px Montserrat Black";
      //   ctx.fillStyle = "#ffd2b3";

      //   ctx.fillText(`${dateMember} > ${timeDate}`, 565, 240);

      //   //Contador de Mutes
      //   ctx.textAlign = "left";
      //   ctx.font = "20px Montserrat Black";
      //   if (tierInfo.highRole) {
      //     ctx.fillStyle = "#fc2314";
      //     ctx.fillText(`HIGH-ROLE USER`, 610, 415);
      //   } else {
      //     ctx.fillStyle = "#ffd2b3";
      //     ctx.fillText(`  MUTES/`, 660, 415);

      //     ctx.textAlign = "left";
      //     ctx.font = "20px Montserrat Black";
      //     ctx.fillStyle = `#eb4034`;

      //     ctx.fillText(`${mutes}`, 758, 415);
      //   }

      //   //Cargo Principal
      //   ctx.textAlign = "center";
      //   ctx.font = "25px Montserrat Black";
      //   ctx.fillStyle = "#ffd2b3";
      //   ctx.fillText(`CARGO:`, 565, 120);
      //   //30px de diferença entre o cargo e o nome do cargo
      //   ctx.textAlign = "center";
      //   ctx.font = "25px Montserrat Black";
      //   ctx.fillStyle = `${roleinfo.roleColor}`;
      //   // userHighRole = userHighRole.slice(2);
      //   // userHighRole = DetectLevel(userHighRole);
      //   ctx.fillText(`${roleinfo.role.name}`, 560, 150);

      //   //Mutes disponiveis
      //   let muteIcon = await loadImage(
      //     path.join(__dirname, "..", "..", "Assets", "img/png/mute.png")
      //   );

      //   ctx.textAlign = "center";
      //   ctx.font = "25px Montserrat Black";
      //   ctx.drawImage(muteIcon, 725, 0, 40, 40);
      //   if (tierInfo.highRole) {
      //     ctx.fillStyle = "#fc2314";
      //     ctx.fillText(`/∞`, 780, 30);
      //   } else {
      //     ctx.fillStyle = "#ffd2b3";
      //     ctx.fillText(`/${availableMutes}`, 780, 30);
      //   }
        
      //   //Insignias

      //   let primaryInsignia = await loadImage(primInsignia.insigniaURL);
      //   let secondaryInsignia = await loadImage(seconInsignia.insigniaURL);

      //   ctx.drawImage(secondaryInsignia, 285, 410, 30, 30);
      //   ctx.drawImage(primaryInsignia, 250, 390, 45, 45);

      //   //XpBoost

      //   if(xpBoost !== 0){
      //     ctx.fillStyle = "#ffd2b3";
      //     ctx.font = "16px Montserrat Black";
      //     ctx.fillText(`${xpBoost}x`, 400, 330);
      //   }

      //   //Nivel em XP

      //   const degress = Math.floor((xp / nextLevelXp) * 360);

      //   ctx.beginPath();
      //   ctx.arc(
      //     400,
      //     350,
      //     70,
      //     (Math.PI / 180) * 270,
      //     (Math.PI / 180) * (270 + 360)
      //   );
      //   ctx.strokeStyle = "#ffd2b3";
      //   ctx.lineWidth = 10;
      //   ctx.stroke();

      //   ctx.textAlign = "center";
      //   ctx.font = "42px Montserrat Black";
      //   ctx.fillStyle = "#ff9463";

      //   ctx.fillText(`${level}`, 400, 365); 

      //   ctx.beginPath();
      //   ctx.strokeStyle = "#ff4d13";
      //   ctx.lineWidth = 10;
      //   ctx.arc(
      //     400,
      //     350,
      //     70,
      //     (Math.PI / 180) * 270,
      //     (Math.PI / 180) * (270 + degress)
      //   );
      //   ctx.stroke();

      //   //Avatar
      //   ctx.beginPath();
      //   ctx.arc(90, 105, 60, 0, Math.PI * 2, true);
      //   ctx.strokeStyle = "#e54038";
      //   ctx.lineWidth = 6;
      //   ctx.stroke();
      //   ctx.closePath();
      //   ctx.clip();

      //   ctx.drawImage(memberAvatar, 20, 30, 135, 135);

      //   return new MessageAttachment(
      //     canvas.toBuffer(),
      //     `Profile_${person.user.id}_.png`
      //   );
      // }

      
    } catch (error) {
      message.react("❌");
      console.log(error);
    }
  },
};
