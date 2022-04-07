import ExtendedClient from "../../Client/index";
import { Command, RoleProfile, TierOptions } from "../../interfaces/index";
import {
  CheckRole,
  Databases,
  EmbedTemplates,
} from "../../../lib/modules/index";
import { UserDataModel } from "../../../models/index";
import { createCanvas, Image, loadImage, registerFont } from "canvas";
import {
  GuildMember,
  Message,
  MessageAttachment,
  MessageEmbed,
  Role,
} from "discord.js";
import path from "path";
registerFont(
  path.join(__dirname, "..", "..", "Assets", "fonts/Montserrat-Black.ttf"),
  {
    family: "Montserrat",
  }
);

export const command: Command = {
  name: "profile",
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

        let tierInfo: TierOptions = setTier(
          numberOfRoles,
          roleInfo.rolePosition
        );

        roleInfo.roleColor = tierInfo.color;

        //*6 Criando uma variavel que armazene a data em que o usuario entrou no servidor
        const date:string = person.joinedAt.toLocaleDateString("pt-br",{
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        })

        const dateTime:string = person.joinedAt.toLocaleTimeString("pt-br",{
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })

        //*7 Pegando as informações do banco do usuario.

        let userDB = await UserDataModel.findOne({ userId: person.id }).exec();
        if (userDB === null) {
          //#region Embed

          let databaseNotFound: MessageEmbed = new MessageEmbed()
            .setColor("#33f5ab")
            .setTitle("**Registrei você em meu Banco!**")
            .setDescription(
              "Aparentemente, não tinha conseguido encontrar você em meu banco de dados. Então acabei de criar um novo com seu id registrado. Por favor, use o comando de novo para ver seu profile."
            )
            .setFooter({ text: "Registro feito com sucesso" });

          //#endregion

          await new Databases().UserData(person.id);
          return message.channel.send({ embeds: [databaseNotFound] });
        }

        const availableMutes: number = userDB.avbMutes;
        const level: number = userDB.level;
        const xp: number = userDB.xp;
        const nextLevel: number = userDB.nextLevelXp;
        const mutesInAccount: number = userDB.countMute;
        const balanceInAccout: string = userDB.balance;

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
        if (message.deletable) {
          message.delete().then(async () => {
            if (loading.deletable) await loading.delete();
          });
        }

        message.channel.send({
          files: [
            await MakeCanvas(
              date,
              dateTime,
              roleInfo,
              availableMutes,
              mutesInAccount,
              balanceInAccout,
              memberAvatar,
              level,
              xp,
              nextLevel,
              tierInfo
            ),
          ],
        });
      });

      async function MakeCanvas(
        dateMember: string,
        timeDate: string,
        roleinfo: RoleProfile,
        availableMutes: number,
        mutes: number,
        balance: string,
        memberAvatar: Image | string,
        level: number,
        xp: number,
        nextLevelXp: number,
        tierInfo: TierOptions
      ) {
        const canvas = createCanvas(800, 450);
        const ctx = canvas.getContext("2d");

        const background = await loadImage(
          path.join(
            __dirname,
            "..",
            "..",
            "Assets",
            "/img/png/Profile_Card2_.png"
          )
        );
        ctx.drawImage(background, 0, 0);

        ctx.textAlign = "center";
        ctx.font = "20px Montserrat Black";
        ctx.fillStyle = "#fff";

        if (person.nickname === null) person.nickname = person.user.username;
        if (person.nickname.length > 10) {
          if (person.nickname.length >= 16 && person.nickname.length <= 18) {
            ctx.fillText(`${person.nickname}`, 110, 200);
          } else if (
            person.nickname.length > 18 &&
            person.nickname.length <= 26
          ) {
            let personLength = person.nickname.length;
            let nickLenghtRound = Math.round(personLength / 2);
            let newNick = person.nickname.slice(nickLenghtRound);
            ctx.fillText(
              `${person.nickname.slice(0, nickLenghtRound)} \n ${newNick}`,
              90,
              200
            );
          } else {
            let personLength = person.nickname.length;
            let nickLenghtRound = Math.round(personLength / 2);
            let newNick = person.nickname.slice(nickLenghtRound);
            ctx.fillText(
              `${person.nickname.slice(0, nickLenghtRound)} \n ${newNick}`,
              105,
              200
            );
          }
        } else {
          ctx.fillText(`${person.nickname}`, 85, 200);
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

        let coin: Image = await loadImage(
          path.join(__dirname, "..", "..", "Assets", "img/png/coin.png")
        );

        ctx.drawImage(coin, 495, 295, 50, 50);

        ctx.textAlign = "left";
        ctx.font = "25px Montserrat Black";
        ctx.fillStyle = "#ffd2b3";
        const newBalance = parseFloat(balance).toFixed(2);
        ctx.fillText(`${newBalance}`, 545, 333);

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
        if (tierInfo.highRole) {
          ctx.fillStyle = "#fc2314";
          ctx.fillText(`HIGH-ROLE USER`, 610, 415);
        } else {
          ctx.fillStyle = "#ffd2b3";
          ctx.fillText(`  MUTES/`, 660, 415);

          ctx.textAlign = "left";
          ctx.font = "20px Montserrat Black";
          ctx.fillStyle = `#eb4034`;

          ctx.fillText(`${mutes}`, 758, 415);
        }

        //Cargo Principal
        ctx.textAlign = "center";
        ctx.font = "25px Montserrat Black";
        ctx.fillStyle = "#ffd2b3";
        ctx.fillText(`CARGO:`, 565, 120);
        //30px de diferença entre o cargo e o nome do cargo
        ctx.textAlign = "center";
        ctx.font = "25px Montserrat Black";
        ctx.fillStyle = `${roleinfo.roleColor}`;
        // userHighRole = userHighRole.slice(2);
        // userHighRole = DetectLevel(userHighRole);
        ctx.fillText(`${roleinfo.role.name}`, 560, 150);

        //Mutes disponiveis
        let muteIcon = await loadImage(
          path.join(__dirname, "..", "..", "Assets", "img/png/mute.png")
        );

        ctx.textAlign = "center";
        ctx.font = "25px Montserrat Black";
        ctx.drawImage(muteIcon, 725, 0, 40, 40);
        if (tierInfo.highRole) {
          ctx.fillStyle = "#fc2314";
          ctx.fillText(`/∞`, 780, 30);
        } else {
          ctx.fillStyle = "#ffd2b3";
          ctx.fillText(`/${availableMutes}`, 780, 30);
        }

        //DEV Profile
        //Frajola
        if(person.id === "261945904829956097") {
          let adminIcon = await loadImage(
            path.join(__dirname, "..", "..", "Assets", "img/insignias/admin-icon.png")
          );
          let devIcon = await loadImage(
            path.join(__dirname, "..", "..", "Assets", "img/insignias/dev-icon.png")
          );
          ctx.drawImage(devIcon, 285, 410, 30, 30 );
          ctx.drawImage(adminIcon, 250, 390, 45, 45);
        }
        //YSoft
        if(person.id === "634472759975739403") {
          let devIcon = await loadImage(
            path.join(__dirname, "..", "..", "Assets", "img/insignias/dev-icon.png")
          );
          let memberIcon = await loadImage(
            path.join(__dirname, "..", "..", "Assets", "img/insignias/member-icon.png")
          );
          ctx.drawImage(memberIcon, 285, 410, 30, 30 );
          ctx.drawImage(devIcon, 250, 390, 45, 45);
        }

        //PARTNER Profile
        //Kojj
        if(person.id == "273322824318582785") {
          let adminIcon = await loadImage(
            path.join(__dirname, "..", "..", "Assets", "img/insignias/partner-icon.jpg")
          );
          let memberIcon = await loadImage(
            path.join(__dirname, "..", "..", "Assets", "img/insignias/member-icon.png")
          );
          ctx.drawImage(memberIcon, 285, 410, 30, 30 );
          ctx.drawImage(adminIcon, 250, 390, 45, 45);
        }

        //PARTNER Profile
        //Rafaé
        if(person.id == "302189041112317963") {
          let adminIcon = await loadImage(
            path.join(__dirname, "..", "..", "Assets", "img/insignias/partner-icon.jpg")
          );
          let memberIcon = await loadImage(
            path.join(__dirname, "..", "..", "Assets", "img/insignias/member-icon.png")
          );
          ctx.drawImage(memberIcon, 285, 410, 30, 30 );
          ctx.drawImage(adminIcon, 250, 390, 45, 45);
        }

        //TODO:COlocar o icon partner no Kojj e no Rafaé
      
        //Nivel em XP

        const degress = Math.floor((xp / nextLevelXp) * 360);

        ctx.beginPath();
        ctx.arc(
          400,
          350,
          70,
          (Math.PI / 180) * 270,
          (Math.PI / 180) * (270 + 360)
        );
        ctx.strokeStyle = "#ffd2b3";
        ctx.lineWidth = 10;
        ctx.stroke();

        ctx.textAlign = "center";
        ctx.font = "42px Montserrat Black";
        ctx.fillStyle = "#ff9463";

        ctx.fillText(`${level}`, 400, 365); //TODO: Trocar para o nivel do usuario

        ctx.beginPath();
        ctx.strokeStyle = "#ff4d13";
        ctx.lineWidth = 10;
        ctx.arc(
          400,
          350,
          70,
          (Math.PI / 180) * 270,
          (Math.PI / 180) * (270 + degress)
        );
        ctx.stroke();

        //Avatar
        ctx.beginPath();
        ctx.arc(90, 105, 60, 0, Math.PI * 2, true);
        ctx.strokeStyle = "#e54038";
        ctx.lineWidth = 6;
        ctx.stroke();
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(memberAvatar, 20, 30, 135, 135);

        return new MessageAttachment(
          canvas.toBuffer(),
          `Profile_${person.user.id}_.png`
        );
      }

      function setTier(
        numberRoles: number,
        highUserRolePosition: number
      ): TierOptions {
        let t1;
        let t2;
        let t3;
        let t4;
        let t5;
        let t6;

        const assignTier = (i: number, tierEnd: string) => {
          let index = i;
          let tier = [];
          for (let j: number = 0; j <= i; j++) {
            index--;
            let roleUnique = message.guild.roles.cache.find(
              (f) => f.position === index
            );
            if (roleUnique.name === tierEnd) break;
            tier.push(roleUnique.position);
          }
          return tier;
        };

        for (let i: number = numberRoles; i >= 0; i--) {
          let role = message.guild.roles.cache.find((f) => f.position === i);
          switch (role.name) {
            case "====T1S====":
              t1 = assignTier(i, "====T1E====");
              break;
            case "====T2S====":
              t2 = assignTier(i, "====T2E====");
              break;
            case "====T3S====":
              t3 = assignTier(i, "====T3E====");
              break;
            case "====T4S====":
              t4 = assignTier(i, "====T4E====");
              break;
            case "====T5S====":
              t5 = assignTier(i, "====T5E====");
              break;
            case "====T6S====":
              t6 = assignTier(i, "====T6E====");
              break;
          }
        }

        if (t1.includes(highUserRolePosition)) {
          return { color: "#e32222", tier: "T1", highRole: true };
        } else if (t2.includes(highUserRolePosition)) {
          return { color: "#a114e3", tier: "T2", highRole: true };
        } else if (t3.includes(highUserRolePosition)) {
          return { color: "#d907ab", tier: "T3", highRole: false };
        } else if (t4.includes(highUserRolePosition)) {
          return { color: "#16f0c8", tier: "T4", highRole: false };
        } else if (t5.includes(highUserRolePosition)) {
          return { color: "#64f720", tier: "T5", highRole: false };
        } else if (t6.includes(highUserRolePosition)) {
          return { color: "#1387ed", tier: "T6", highRole: false };
        }
      }

    } catch (error) {
      message.react("❌");
      console.log(error);
    }
  },
};