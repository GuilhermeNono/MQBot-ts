import { createCanvas, Image, loadImage, NodeCanvasRenderingContext2DSettings } from "canvas";
import { ColorResolvable, GuildMember, MessageAttachment } from "discord.js";
import path from "path";
import { TierOptions } from "../../src/interfaces";
import { canvasWalletBalance, canvasWalletUsername } from "./CanvasFunction";

interface CanvasInfo {
    canvasWidth:number;
    canvasHeight:number;
}

interface userInfo {
    userAvatarImage:Image;
    userId?:string;
    guildMember?:GuildMember;
}

interface profileCanvasInfo{
  balance:string;
  dateMemberJoined:string;
  timeMemberJoined:string;
  numberOfRoles:number;
  rolePosition:number;
  mutesInAccount:number;
}

export default class CanvasUI implements CanvasInfo{
    readonly xPosition:number;
    readonly yPosition:number;
    readonly radius:number;
    canvasHeight: number;
    canvasWidth: number;

    constructor(canvasHeight:number, canvasWidth:number){
      this.canvasHeight = canvasHeight;
      this.canvasWidth = canvasWidth
    }
    
    //TODO Finalizar o metodo
    // async CanvasProfile(userInfo:userInfo, profileCanvasInfo:profileCanvasInfo):Promise<MessageAttachment> {

    //   async function MakeCanvas(
    //     dateMember: string,
    //     xpBoost: number,
    //     primInsignia: InsigniaInfo,
    //     seconInsignia: InsigniaInfo,
    //     timeDate: string,
    //     roleinfo: RoleProfile,
    //     availableMutes: number,
    //     mutes: number,
    //     balance: string,
    //     memberAvatar: Image | string,
    //     level: number,
    //     xp: number,
    //     nextLevelXp: number,
    //     tierInfo: TierOptions
    //   ) {
    //     const canvas = createCanvas(this.canvasWidth, this.canvasHeight);
    //     const ctx = canvas.getContext("2d");

    //     const background = await loadImage(
    //       path.join(
    //         __dirname,
    //         "..",
    //         "..",
    //         "src",
    //         "Assets",
    //         "/img/png/Profile_Card4_.png"
    //       )
    //     );
    //     ctx.drawImage(background, 0, 0);

    //     ctx.textAlign = "center";
    //     ctx.font = "20px Montserrat Black";
    //     ctx.fillStyle = "#fff";

    //     if (userInfo.guildMember.nickname === null) userInfo.guildMember.nickname = userInfo.guildMember.user.username;
    //     if (userInfo.guildMember.nickname.length > 10) {
    //       if (userInfo.guildMember.nickname.length >= 16 && userInfo.guildMember.nickname.length <= 18) {
    //         ctx.fillText(`${userInfo.guildMember.nickname}`, 110, 200);
    //       } else if (
    //         userInfo.guildMember.nickname.length > 18 &&
    //         userInfo.guildMember.nickname.length <= 26
    //       ) {
    //         let personLength = userInfo.guildMember.nickname.length;
    //         let nickLenghtRound = Math.round(personLength / 2);
    //         let newNick = userInfo.guildMember.nickname.slice(nickLenghtRound);
    //         ctx.fillText(
    //           `${userInfo.guildMember.nickname.slice(0, nickLenghtRound)} \n ${newNick}`,
    //           90,
    //           200
    //         );
    //       } else {
    //         let personLength = userInfo.guildMember.nickname.length;
    //         let nickLenghtRound = Math.round(personLength / 2);
    //         let newNick = userInfo.guildMember.nickname.slice(nickLenghtRound);
    //         ctx.fillText(
    //           `${userInfo.guildMember.nickname.slice(0, nickLenghtRound)} \n ${newNick}`,
    //           105,
    //           200
    //         );
    //       }
    //     } else {
    //       ctx.fillText(`${userInfo.guildMember.nickname}`, 85, 200);
    //     }

    //     🎫| UserCard ➔ ${person.user.username} |🎫

    //     let personNewNick = userInfo.guildMember.user.username;
    //     ctx.textAlign = "center";
    //     ctx.font = "24px Montserrat Black";
    //     ctx.fillStyle = "#ffd2b3";
    //     ctx.fillText(`${personNewNick}`, 565, 30);

    //     id
    //     ctx.textAlign = "center";
    //     ctx.font = "20px Montserrat Black";
    //     ctx.fillStyle = "#ffd2b3";
    //     ctx.fillText(`${userInfo.userId}`, 565, 50);

    //     Coins

    //     let coin: Image = await loadImage(
    //       path.join(__dirname, "..", "..", "Assets", "img/png/coin.png")
    //     );

    //     ctx.drawImage(coin, 495, 295, 50, 50);

    //     ctx.textAlign = "left";
    //     ctx.font = "25px Montserrat Black";
    //     ctx.fillStyle = "#ffd2b3";
    //     const newBalance = parseFloat(profileCanvasInfo.balance).toFixed(2);
    //     ctx.fillText(`${newBalance}`, 545, 333);

    //     Membro dês de
    //     ctx.textAlign = "center";
    //     ctx.font = "25px Montserrat Black";
    //     ctx.fillStyle = "#ffd2b3";
    //     ctx.fillText(`  ENTROU:`, 565, 210);

    //     ctx.textAlign = "center";
    //     ctx.font = "20px Montserrat Black";
    //     ctx.fillStyle = "#ffd2b3";
    //     TODO
    //     ctx.fillText(`${profileCanvasInfo.dateMemberJoined} > ${profileCanvasInfo.timeMemberJoined}`, 565, 240);

    //     Contador de Mutes
    //     ctx.textAlign = "left";
    //     ctx.font = "20px Montserrat Black";

    //     let tierInfo: TierOptions = setTier(
    //       profileCanvasInfo.numberOfRoles,
    //       profileCanvasInfo.rolePosition
    //     );

    //     if (tierInfo.highRole) {
    //       ctx.fillStyle = "#fc2314";
    //       ctx.fillText(`HIGH-ROLE USER`, 610, 415);
    //     } else {
    //       ctx.fillStyle = "#ffd2b3";
    //       ctx.fillText(`  MUTES/`, 660, 415);

    //       ctx.textAlign = "left";
    //       ctx.font = "20px Montserrat Black";
    //       ctx.fillStyle = `#eb4034`;

    //       ctx.fillText(`${profileCanvasInfo.mutesInAccount}`, 758, 415);
    //     }

    //     Cargo Principal
    //     ctx.textAlign = "center";
    //     ctx.font = "25px Montserrat Black";
    //     ctx.fillStyle = "#ffd2b3";
    //     ctx.fillText(`CARGO:`, 565, 120);
    //     30px de diferença entre o cargo e o nome do cargo
    //     ctx.textAlign = "center";
    //     ctx.font = "25px Montserrat Black";
    //     ctx.fillStyle = `${roleinfo.roleColor}`;
    //     userHighRole = userHighRole.slice(2);
    //     userHighRole = DetectLevel(userHighRole);
    //     ctx.fillText(`${roleinfo.role.name}`, 560, 150);

    //     Mutes disponiveis
    //     let muteIcon = await loadImage(
    //       path.join(__dirname, "..", "..", "Assets", "img/png/mute.png")
    //     );

    //     ctx.textAlign = "center";
    //     ctx.font = "25px Montserrat Black";
    //     ctx.drawImage(muteIcon, 725, 0, 40, 40);
    //     if (tierInfo.highRole) {
    //       ctx.fillStyle = "#fc2314";
    //       ctx.fillText(`/∞`, 780, 30);
    //     } else {
    //       ctx.fillStyle = "#ffd2b3";
    //       ctx.fillText(`/${availableMutes}`, 780, 30);
    //     }
        
    //     Insignias

    //     let primaryInsignia = await loadImage(primInsignia.insigniaURL);
    //     let secondaryInsignia = await loadImage(seconInsignia.insigniaURL);

    //     ctx.drawImage(secondaryInsignia, 285, 410, 30, 30);
    //     ctx.drawImage(primaryInsignia, 250, 390, 45, 45);

    //     XpBoost

    //     if(xpBoost !== 0){
    //       ctx.fillStyle = "#ffd2b3";
    //       ctx.font = "16px Montserrat Black";
    //       ctx.fillText(`${xpBoost}x`, 400, 330);
    //     }

    //     Nivel em XP

    //     const degress = Math.floor((xp / nextLevelXp) * 360);

    //     ctx.beginPath();
    //     ctx.arc(
    //       400,
    //       350,
    //       70,
    //       (Math.PI / 180) * 270,
    //       (Math.PI / 180) * (270 + 360)
    //     );
    //     ctx.strokeStyle = "#ffd2b3";
    //     ctx.lineWidth = 10;
    //     ctx.stroke();

    //     ctx.textAlign = "center";
    //     ctx.font = "42px Montserrat Black";
    //     ctx.fillStyle = "#ff9463";

    //     ctx.fillText(`${level}`, 400, 365); 

    //     ctx.beginPath();
    //     ctx.strokeStyle = "#ff4d13";
    //     ctx.lineWidth = 10;
    //     ctx.arc(
    //       400,
    //       350,
    //       70,
    //       (Math.PI / 180) * 270,
    //       (Math.PI / 180) * (270 + degress)
    //     );
    //     ctx.stroke();

    //     Avatar
    //     ctx.beginPath();
    //     ctx.arc(90, 105, 60, 0, Math.PI * 2, true);
    //     ctx.strokeStyle = "#e54038";
    //     ctx.lineWidth = 6;
    //     ctx.stroke();
    //     ctx.closePath();
    //     ctx.clip();

    //     ctx.drawImage(userInfo.userAvatarImage, 20, 30, 135, 135);

    //     return new MessageAttachment(
    //       canvas.toBuffer(),
    //       `Profile_${userInfo.userId}_.png`
    //     );
    //   }

    // }

    async CanvasWallet(userInfo:userInfo ):Promise<MessageAttachment> {
            const canvas = createCanvas(this.canvasWidth, this.canvasHeight);
            const ctx = canvas.getContext("2d");
            const lockedImage = await loadImage(path.join(
              __dirname,
              "..",
              "..",
              "src",
              "Assets",
              "/img/png/locked.png"
            ))
            const background = await loadImage(
              path.join(
                __dirname,
                "..",
                "..",
                "src",
                "Assets",
                "/img/png/Carteira.png"
              )
            );

            ctx.drawImage(background, 0, 0);


            canvasWalletUsername(ctx)
            canvasWalletBalance(ctx)

            //TODO Descobrir como colocar mais de uma imagem aparecendo no canvas
            makeCircle({
              canvasContext: ctx,
              color: "#000",
              outline: 2,
              radius: 37,
              xPosition: 54.5,
              yPosition: 193.5,
            });
            
            // ctx.Imgage(lockedImage, 13, 10, 77, 76);

            //Foto de Perfil
            makeCircle({
              canvasContext: ctx,
              color: "#000",
              outline: 2,
              radius: 37,
              xPosition: 52.5,
              yPosition: 47.5,
            });
            ctx.drawImage(userInfo.userAvatarImage, 13, 10, 80, 80);

            return new MessageAttachment(
              canvas.toBuffer(),
              `Wallet_${userInfo.userId}_.png`
            );
          
    }
}

//    canvasContext.arc(52.50, 47.50, 37, 0, Math.PI * 2, true);

interface CircleOptions {
  canvasContext: any;
  xPosition: number;
  yPosition: number;
  radius: number;
  color: ColorResolvable;
  outline: number;
}

function makeCircle(options: CircleOptions):void {
  options.canvasContext.beginPath();
  options.canvasContext.arc(options.xPosition, options.yPosition, options.radius, 0, Math.PI * 2, true);
  options.canvasContext.strokeStyle = options.color;
  options.canvasContext.lineWidth = options.outline;
  options.canvasContext.clip();
  options.canvasContext.closePath();
  options.canvasContext.stroke();
}

// function setTier(
//   numberRoles: number,
//   highUserRolePosition: number
// ): TierOptions {
//   let t1;
//   let t2;
//   let t3;
//   let t4;
//   let t5;
//   let t6;

//   const assignTier = (i: number, tierEnd: string) => {
//     let index = i;
//     let tier = [];
//     for (let j: number = 0; j <= i; j++) {
//       index--;
//       let roleUnique = message.guild.roles.cache.find(
//         (f) => f.position === index
//       );
//       if (roleUnique.name === tierEnd) break;
//       tier.push(roleUnique.position);
//     }
//     return tier;
//   };

//   for (let i: number = numberRoles; i >= 0; i--) {
//     let role = message.guild.roles.cache.find((f) => f.position === i);
//     switch (role.name) {
//       case "====T1S====":
//         t1 = assignTier(i, "====T1E====");
//         break;
//       case "====T2S====":
//         t2 = assignTier(i, "====T2E====");
//         break;
//       case "====T3S====":
//         t3 = assignTier(i, "====T3E====");
//         break;
//       case "====T4S====":
//         t4 = assignTier(i, "====T4E====");
//         break;
//       case "====T5S====":
//         t5 = assignTier(i, "====T5E====");
//         break;
//       case "====T6S====":
//         t6 = assignTier(i, "====T6E====");
//         break;
//     }
//   }

//   if (t1.includes(highUserRolePosition)) {
//     return { color: "#e32222", tier: "T1", highRole: true };
//   } else if (t2.includes(highUserRolePosition)) {
//     return { color: "#a114e3", tier: "T2", highRole: true };
//   } else if (t3.includes(highUserRolePosition)) {
//     return { color: "#d907ab", tier: "T3", highRole: false };
//   } else if (t4.includes(highUserRolePosition)) {
//     return { color: "#16f0c8", tier: "T4", highRole: false };
//   } else if (t5.includes(highUserRolePosition)) {
//     return { color: "#64f720", tier: "T5", highRole: false };
//   } else if (t6.includes(highUserRolePosition)) {
//     return { color: "#1387ed", tier: "T6", highRole: false };
//   }
// }