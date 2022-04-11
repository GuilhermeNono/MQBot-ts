import { getModelForClass, prop } from "@typegoose/typegoose";
class GuildData {
    @prop()
    guildID: string;
    @prop()
    ownerGuildID: string;
    @prop()
    isAuthorized:boolean;
    @prop()
    prefix: string;
}

const GuildDataModel = getModelForClass(GuildData);

export {GuildDataModel};


    