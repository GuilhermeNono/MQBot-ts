import {getModelForClass, modelOptions, prop} from '@typegoose/typegoose'
import mongoose from 'mongoose';

class InsigniaData {
    @prop()
    insigniaID: number;
    @prop()
    insigniaName: string;
    @prop()
    insigniaURL: string;
    @prop()
    xpBoost: mongoose.Schema.Types.Decimal128;
    @prop()
    description: string;
    @prop()
    rarity: number;
}

const insigniaDataModel = getModelForClass(InsigniaData);

export {insigniaDataModel}