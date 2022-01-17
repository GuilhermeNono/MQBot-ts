import { getModelForClass, prop } from "@typegoose/typegoose";
//@ts-ignore
class userBoost {
    @prop()
    userId: string;
    @prop()
    numberChannel: number;
    @prop()
    idChannel: string;
}

const UserBoostModel = getModelForClass(userBoost);

export {UserBoostModel};


    