import { getModelForClass, prop } from "@typegoose/typegoose";
class userBoost {
    @prop()
    userId: string;
    @prop()
    numberChannel: number;
    @prop()
    serverId:string;
    @prop()
    idChannel: string;
}

const UserBoostModel = getModelForClass(userBoost);

export {UserBoostModel};


    