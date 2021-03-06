import { Client, Collection } from "discord.js";
import { connect } from "mongoose";
import path from "path";
import { readdirSync } from "fs";
import { Command, Event } from "../interfaces/index";
import dotenv from "dotenv";
import { green, red, yellow } from "colors";
import { Contador, InitDB, MuteRefil } from "../Events/Cycle/index";

dotenv.config();

class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public aliases: Collection<string, Command> = new Collection();

  public async init() {
    const dToken = process.env["DISCORD_TOKEN"];
    await this.login(dToken);
    await connect(process.env["MONGODB_LOGIN"]);

    //*Commands

    console.log(yellow("⌛ Initializing Commands...⌛"));

    const commandPath: string = path.join(__dirname, "..", "Commands");
    readdirSync(commandPath).forEach((dir) => {
      try {
        //Possivel problema no momento de assinar os valores no "commands"
        let commands: string[] = readdirSync(`${commandPath}/${dir}`).filter(
          (file) => {
            if (endsWithAny([".js", ".ts"], file)) return file;
          }
        );
        for (const file of commands) {
          const { command } = require(`${commandPath}/${dir}/${file}`);
          this.commands.set(command.name, command);

          if (command?.aliases.length !== 0) {
            command.aliases.forEach((alias: any) => {
              this.aliases.set(alias, command);
            });
          }
        }
        console.log(
          green.bold(`✔ ${dir} - Commands loaded without any error. ✔`)
        );
      } catch (error) {
        console.log(
          red.bold(
            `❌ LOADING FAILURE - Failed to load folder "${
              dir ?? __dirname
            }". ❌`
          )
        );
        throw error;
      }
    });

    //*Events

    console.log(yellow("⌛ Initializing Events...⌛"));

    const load_dir = async (dir: string) => {
      try {
        const eventPath = path.join(__dirname, "..", "Events", `${dir}`);
        const event_files = readdirSync(eventPath).filter(async (file) => {
          if (endsWithAny([".ts", ".js"], file)) {
            return file;
          }
        });
        for (const file of event_files) {
          const { event } = await import(`${eventPath}/${file}`);
          this.events.set(event.name, event);
          this.on(event.name, event.run.bind(null, this));
        }

        console.log(
          green.bold(`✔ ${dir} - Events loaded without any error. ✔`)
        );
      } catch (error) {
        console.log(
          red.bold(
            `❌ LOADING FAILURE - Failed to load folder "${
              dir ?? __dirname
            }". ❌`
          )
        );
        throw error;
      }
    };

    ["Guild"].forEach(async (e) => await load_dir(e));

    console.log(`✨${this.user.tag}'s Online!✨`);
    await InitDB(this);
    await MuteRefil(this);
    await Contador(this);
  }
}

export default ExtendedClient;
function endsWithAny(suffixes: string[], string: string) {
  return suffixes.some((suffix) => string.endsWith(suffix));
}
