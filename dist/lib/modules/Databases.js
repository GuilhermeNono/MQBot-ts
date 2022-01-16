"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../models/index.js");
class Databases {
    /**
     * 💠 - Cria um banco de dados para o usuario.
     * @returns Verdadeiro significará que a operação foi um sucesso.
     */
    async UserData(userId, isMuted = false, isBan = false, countBan = 0, countMute = 0, avbMutes = 0, balance = "0", primaryInsignia = 0, secondaryInsignia = 0, insigniaID = [0]) {
        try {
            const doc = new index_js_1.UserDataModel({
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
        }
        catch {
            return false;
        }
    }
    /**
     * 💠 - Cria um banco de dados para os bufadores.
     * @returns Verdadeiro significará que a operação foi um sucesso.
     */
    async UserBoost(userId, numberChannel = 0, idChannel = "000") {
        try {
            const doc = new index_js_1.UserBoostModel({
                userId: userId,
                numberChannel: numberChannel,
                idChannel: idChannel,
            });
            await doc.save();
            return true;
        }
        catch {
            return false;
        }
    }
}
exports.default = Databases;
