import {getModelForClass, prop} from '@typegoose/typegoose'

class InsigniaData {
    @prop()
    insigniaID: number;
    @prop()
    insigniaName: string;
    @prop()
    insigniaURL: string;
}

const insigniaDataModel = getModelForClass(InsigniaData);

export {insigniaDataModel}