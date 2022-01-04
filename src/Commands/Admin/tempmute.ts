import { Command } from "@Interface";

export const command: Command = {
  name: "tempmute",
  aliases: ["tm"],
  description: "Comando para deixar o usuario mutado por tempo limitado.",
  run: async (client, message, args) => {
    try {
      //TODO: 1 Checar se o usuario tem mutes disponiveis em sua conta ou, tem permissão para optar por gastar.
      //TODO: 2 Puxando as informações do membro e, verificando se o usuario não digitou errado e se o usuario pode ser punido.
      //TODO: 3 Criando variavel para armazenar o tempo e verificando se o usuario-o digitou corretamente.
      //TODO: 4 Criando uma variavel que armazene o motivo.
      //TODO: 5 Configurando o tempo para a punição.
      //TODO: 6 Criando, definindo a posição do cargo na hierarquia e setando para cada canal do servidor a devida permissão do cargo.
      //TODO: 7 Adicionando o cargo de "Muted" no usuario mutado e criando os templates para as punições
      //TODO: 8 Subtraindo um mute do banco do usuario
      //TODO: 9 Atribundo o valor da função RandomPhrases para uma variavel
      //TODO: 10 Setando os canais publicos e privados, e por ultimo, adicionando um teporizador para retirar o cargo de "Muted" depois de um certo tempo.
    } catch (error) {}
  },
};
