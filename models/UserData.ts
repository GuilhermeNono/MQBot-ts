import { getModelForClass, prop } from "@typegoose/typegoose";

class UserData {
  @prop()
  public userId: string;
  @prop()
  public serverId: string;
  @prop()
  public isMuted: boolean;
  @prop()
  public isBan: boolean;
  @prop()
  public exp: number;
  @prop()
  public countMute: number;
  @prop()
  public countBan: number;
  @prop()
  public avbMutes: number;
  @prop({ type: () => [Number] })
  public insigniaID: number[];
  @prop()
  public balance: string;
  @prop()
  public primaryInsignia: number;
  @prop()
  public secondaryInsignia: number;
  @prop()
  public xp: number;
  @prop()
  public level: number;
  @prop()
  public nextLevelXp: number;
}

const UserDataModel = getModelForClass(UserData);

export {UserDataModel}