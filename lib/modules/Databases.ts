import { UserDataModel } from "@Models";

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
    insigniaID: number[] = [0]
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
      });

      await doc.save();
      return true;
    } catch {
      return false;
    }
  }
}

export default Databases;