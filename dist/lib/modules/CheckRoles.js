"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CheckRole {
    constructor(client, guildMemberUser, idRolesWithPermission) {
        this.client = client;
        this.idRolesWithPermission = idRolesWithPermission;
        this.guildMemberUser = guildMemberUser;
    }
    /**
     * 🔰 - Verifica se o usuario tem, pelo menos uma, das roles informadas.
     * @returns Verdadeiro quando encontra e, caso contrario, falso.
     */
    CheckReturnBoolean() {
        //Caso não sejá informado nem um ID, será impossivel usar esse metodo, retornando então, nulo.
        if (!this.idRolesWithPermission)
            throw "Não foi informado os ids dos cargos no cosntrutor da classe.";
        const userRolesMap = this.guildMemberUser.roles.cache.map((roles) => roles.id);
        for (const keyPerm in this.idRolesWithPermission) {
            for (const keyPermUser in userRolesMap) {
                if (this.idRolesWithPermission[keyPerm] === userRolesMap[keyPermUser]) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * 🔰 - Verifica se o usuario tem, pelo menos uma, das roles informadas.
     * @returns Os IDs das roles que o usuario possui.
     */
    CheckReturnId() {
        //Caso não sejá informado nem um ID, será impossivel usar esse metodo, retornando então, nulo.
        if (!this.idRolesWithPermission)
            throw "Não foi informado os ids dos cargos no cosntrutor da classe.";
        const userRolesMap = this.guildMemberUser.roles.cache.map((roles) => roles.id);
        const newArrayList = [];
        for (const keyPerm in this.idRolesWithPermission) {
            for (const keyPermUser in userRolesMap) {
                if (this.idRolesWithPermission[keyPerm] === userRolesMap[keyPermUser]) {
                    if (this.idRolesWithPermission[keyPerm] !== this.guildMemberUser.guild.id) {
                        newArrayList.push(userRolesMap[keyPermUser]);
                    }
                }
            }
        }
        return newArrayList;
    }
    /**
     * 🔰 - Verifica se o usuario tem, pelo menos uma, das roles de alto nivel.
     * @returns Verdadeiro quando encontra e, caso contrario, falso.
     */
    CheckHighRoleBool() {
        this.idRolesWithPermission = [
            "929426173673500673",
            "929418031795408916",
            "929435905926791168",
            "735147189432483920",
            "716006513818468404",
            "716008029396533349",
            "731199687981400097", //Role "MOD" > Muquifo
        ];
        return this.CheckReturnBoolean();
    }
}
exports.default = CheckRole;
