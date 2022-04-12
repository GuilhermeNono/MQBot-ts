import {getModelForClass, prop} from '@typegoose/typegoose'
import mongoose from 'mongoose';

class InsigniaData {
    @prop()
    insigniaID: number;
    @prop()
    insigniaName: string;
    @prop()
    insigniaURL: string;
    @prop()
    xpBoost: mongoose.Decimal128;
    @prop()
    description: string;
    @prop()
    rarity: number;
}

const insigniaDataModel = getModelForClass(InsigniaData);

export {insigniaDataModel}