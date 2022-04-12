import { ColorResolvable } from "discord.js";

/**
 * 💠 - Define uma cor para a raridade informada.
 * @returns A cor da raridade.
 * @example SetRarity(1): "#2bff4e"
 */

function SetRarity(rarity: number): ColorResolvable {
  switch (rarity) {
    case 0:
      return "#a6a6a6";
    case 1:
      return "#2bff4e";
    case 2:
      return "#2bdfff";
    case 3:
      return "#8e2bff";
    case 4:
      return "#ffaa2b";
    case 5:
      return "#ff392b";
  }
}

export default SetRarity;
