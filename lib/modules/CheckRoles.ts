import ExtendedClient from "../../src/Client";
import { GuildMember} from "discord.js";

class CheckRole {
  idRolesWithPermission: string[];
  guildMemberUser: GuildMember;

  constructor(
    private client: ExtendedClient,
    guildMemberUser: GuildMember,
    idRolesWithPermission?: string[]
  ) {
    this.idRolesWithPermission = idRolesWithPermission;
    this.guildMemberUser = guildMemberUser;
  }

  /**
   * 🔰 - Verifica se o usuario tem, pelo menos uma, das roles informadas.
   * @returns Verdadeiro quando encontra e, caso contrario, falso.
   */
  CheckReturnBoolean(): boolean {
    //Caso não sejá informado nem um ID, será impossivel usar esse metodo, retornando então, nulo.
    if (!this.idRolesWithPermission)
      throw "Não foi informado os ids dos cargos no cosntrutor da classe.";

    const userRolesMap:string[] = this.guildMemberUser.roles.cache.map(
      (roles) => roles.id
    );
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
  CheckReturnId(): string[] {
    //Caso não sejá informado nem um ID, será impossivel usar esse metodo, retornando então, nulo.
    if (!this.idRolesWithPermission)
      throw "Não foi informado os ids dos cargos no cosntrutor da classe.";

    const userRolesMap:string[] = this.guildMemberUser.roles.cache.map(
      (roles) => roles.id
    );
    const newArrayList: string[] = [];

    for (const keyPerm in this.idRolesWithPermission) {
      for (const keyPermUser in userRolesMap) {
        if (this.idRolesWithPermission[keyPerm] === userRolesMap[keyPermUser]) {
          if(this.idRolesWithPermission[keyPerm] !== this.guildMemberUser.guild.id){
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
  CheckHighRoleBool(): boolean {
    this.idRolesWithPermission = [
      "929426173673500673", //Role "Fei" > brioco
      "929418031795408916", //Role "Adm" > brioco
      "929435905926791168", //Role "Mod" > brioco
      "735147189432483920", //Role "Zé" > Peach Server
      "716006513818468404", //Role "MACACOS" > Muquifo
      "716008029396533349", //Role "FUNAI" > Muquifo
      "731199687981400097", //Role "MOD" > Muquifo
    ];

    return this.CheckReturnBoolean();
  }
}

export default CheckRole;
