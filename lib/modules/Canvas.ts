import { createCanvas, Image, loadImage, NodeCanvasRenderingContext2DSettings } from "canvas";
import { ColorResolvable, MessageAttachment } from "discord.js";
import path from "path";

interface CanvasInfo {
    canvasWidth:number;
    canvasHeight:number;
}

interface userInfo {
    userAvatarImage:Image;
    userId:string;
}

export default class CanvasUI {
    readonly xPosition:number;
    readonly yPosition:number;
    readonly radius:number;
    
    // async CanvasProfile():Promise<MessageAttachment> {

    // }

    async CanvasWallet(canvasInfo:CanvasInfo, userInfo:userInfo ):Promise<MessageAttachment> {
            const canvas = createCanvas(canvasInfo.canvasWidth, canvasInfo.canvasHeight);
            const ctx = canvas.getContext("2d");
      
            const background = await loadImage(
              path.join(__dirname, "..", "..", "src", "Assets", "/img/png/Carteira.png")
            );
      
            ctx.drawImage(background, 0, 0);
      
            //Foto de Perfil
            makeCircle({
              canvasContext: ctx,
              color: "#000",
              outline: 2,
              radius: 37,
              xPosition: 52.5,
              yPosition: 47.5,
            });
            ctx.drawImage(userInfo.userAvatarImage, 13, 10,80,80);
      
            
      
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
  options.canvasContext.stroke();
  options.canvasContext.closePath();
  options.canvasContext.clip();
}