import { Client, Collection } from "discord.js";
import {connect} from "mongoose";
import path from "path";
import { readdirSync } from "fs";
import { Command, Event } from "@Interface";
import dotenv from "dotenv";
import { green, red, yellow } from "colors";

dotenv.config();

class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public aliases: Collection<string, Command> = new Collection();

  public async init() {
    this.login(process.env["DISCORD_TOKEN"]);
    await connect(process.env["MONGODB_LOGIN"], {
      
    });

    //*Commands

    console.log(yellow("⌛ Initializing Commands...⌛"));

    const commandPath = path.join(__dirname, "..", "Commands");
    readdirSync(commandPath).forEach((dir) => {
      try {
        const commands = readdirSync(`${commandPath}/${dir}`).filter((file) =>
          file.endsWith(".ts")
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
        const event_files = readdirSync(eventPath).filter(async (file) =>
          file.endsWith(".ts")
        );

        for (const file of event_files) {
          const { event } = await import(`${eventPath}/${file}`);
          this.events.set(event.name, event);
          // console.log(event);
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

    ["Client", "Guild"].forEach((e) => load_dir(e));
  }
}

export default ExtendedClient;
