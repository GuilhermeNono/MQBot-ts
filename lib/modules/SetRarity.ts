import { ColorResolvable } from "discord.js";
import ExtendedClient from "../../src/Client";

class Rarity {
  constructor(
    private client: ExtendedClient,
    private rarity: number
  ) {
    this.client = client;
    this.rarity = rarity;
  }

/**
 * 💠 - Define uma cor para a raridade informada.
 * @returns A cor da raridade.
 * @example getColorRarity(1): "#2bff4e"
 */
  getColorRarity(): ColorResolvable {
    switch (this.rarity) {
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

  /**
 * 💠 - Define um emoji para a raridade informada.
 * @returns Uma string com um emoji.
 * @example getEmojiRarity(2): "🔹"
 */
  getEmojiRarity(): string {
    switch (this.rarity) {
      case 0:
        return "🔘";
      case 1:
        return "🟢";
      case 2:
        return "🔹";
      case 3:
        return "💠";
      case 4:
        return "🔶";
      case 5:
        return "🔺";
    }
  }
}

export default Rarity;
