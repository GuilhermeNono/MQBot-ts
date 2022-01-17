import { getModelForClass, prop } from "@typegoose/typegoose";
//@ts-ignore
class GuildData {
    @prop()
    guildID: string;
    @prop()
    ownerGuildID: string;
    @prop()
    prefix: string;
}

const GuildDataModel = getModelForClass(GuildData);

export {GuildDataModel};


    