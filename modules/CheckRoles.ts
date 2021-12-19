import { GuildMember, Message } from "discord.js";

class CheckRole {
  idRolesWithPermission: string[];
  guildMemberUser: GuildMember;
  message: Message;

  constructor(message: Message, idRolesWithPermission:string[], guildMemberUser:GuildMember) {
    this.message = message
    this.idRolesWithPermission = idRolesWithPermission
    this.guildMemberUser = guildMemberUser
  }


  CheckReturnBoolean(): boolean {
    const userRolesMap = this.guildMemberUser.roles.cache.map((roles) => roles.id);    
    for (const keyPerm in this.idRolesWithPermission) {
       for(const keyPermUser in userRolesMap) {
           if(this.idRolesWithPermission[keyPerm] === userRolesMap[keyPermUser]){
            return true
           }
       } 
    }
    //Roles passadas para a verificação > this.rolesWithPermission[0] = '123'
    //Roles pertencentes ao usuario > userRolesMap[0] = '231'
    return false;
  }

  CheckReturnId(): string[] {
    const userRolesMap = this.guildMemberUser.roles.cache.map((roles) => roles.id);
    const newArrayList: string[] = []

    for (const keyPerm in this.idRolesWithPermission) {
       for(const keyPermUser in userRolesMap) {
           if(this.idRolesWithPermission[keyPerm] === userRolesMap[keyPermUser]){
            newArrayList.push(userRolesMap[keyPermUser])
           }
       } 
    }
    return newArrayList
  }
}

export {CheckRole};