import { UserDataModel, UserBoostModel, insigniaDataModel} from "../../models/index";

class Databases {
  /**
   * 💠 - Cria um banco de dados para o usuario.
   * @returns Verdadeiro significará que a operação foi um sucesso.
   */

  async UserData(
    userId: string,
    isMuted: boolean = false,
    isBan: boolean = false,
    countBan: number = 0,
    countMute: number = 0,
    avbMutes: number = 0,
    balance: string = "0",
    primaryInsignia: number = 0,
    secondaryInsignia: number = 0,
    insigniaID: number[] = [0],
    xp: number = 1000,
    level: number = 1,
    nextLevelXp: number = 2000
  ): Promise<boolean> {
    try {
      const doc = new UserDataModel({
        userId: userId,
        isMuted: isMuted,
        isBan: isBan,
        countBan: countBan,
        countMute: countMute,
        avbMutes: avbMutes,
        balance: balance,
        primaryInsignia: primaryInsignia,
        secondaryInsignia: secondaryInsignia,
        insigniaID: insigniaID,
        xp: xp,
        level: level,
        nextLevelXp: nextLevelXp
      });

      await doc.save();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 💠 - Cria um banco de dados para os bufadores.
   * @returns Verdadeiro significará que a operação foi um sucesso.
   */

  async UserBoost(
    userId: string,
    numberChannel: number = 0,
    idChannel: string = "000"
  ): Promise<boolean> {
    try {
      const doc = new UserBoostModel({
        userId: userId,
        numberChannel: numberChannel,
        idChannel: idChannel,
      });

      await doc.save();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 💠 - Cria um banco de dados para novas insignias.
   * @returns Verdadeiro significará que a operação foi um sucesso.
   */
  async InsigniaData (
    InsigniaID:number,
    InsigniaName:string,
    InsigniaURL:string
  ):Promise<boolean> {
    try {
      const doc = new insigniaDataModel({
        insigniaID: InsigniaID,
        insigniaName: InsigniaName,
        insigniaURL: InsigniaURL
      });

      await doc.save();
      return true;
    } catch {
      return false;
    }
  }
}

export default Databases;
