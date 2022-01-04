import { GuildMember, Message } from "discord.js";

class CheckRole {
  idRolesWithPermission: string[];
  guildMemberUser: GuildMember;
  message: Message;

  constructor(
    message: Message,
    idRolesWithPermission: string[],
    guildMemberUser: GuildMember
  ) {
    this.message = message;
    this.idRolesWithPermission = idRolesWithPermission;
    this.guildMemberUser = guildMemberUser;
  }

  /**
   * 🔰 - Verifica se o usuario tem, pelo menos uma, das roles informadas.
   * @returns Verdadeiro quando encontra e, caso contrario, falso.
   */
  CheckReturnBoolean(): boolean {
    const userRolesMap = this.guildMemberUser.roles.cache.map(
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
    const userRolesMap = this.guildMemberUser.roles.cache.map(
      (roles) => roles.id
    );
    const newArrayList: string[] = [];

    for (const keyPerm in this.idRolesWithPermission) {
      for (const keyPermUser in userRolesMap) {
        if (this.idRolesWithPermission[keyPerm] === userRolesMap[keyPermUser]) {
          newArrayList.push(userRolesMap[keyPermUser]);
        }
      }
    }
    return newArrayList;
  }
}

export default CheckRole;
