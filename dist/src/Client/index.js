"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const mongoose_1 = require("mongoose");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const dotenv_1 = __importDefault(require("dotenv"));
const colors_1 = require("colors");
dotenv_1.default.config();
class ExtendedClient extends discord_js_1.Client {
    constructor() {
        super(...arguments);
        this.commands = new discord_js_1.Collection();
        this.events = new discord_js_1.Collection();
        this.aliases = new discord_js_1.Collection();
    }
    async init() {
        this.login(process.env["DISCORD_TOKEN"]);
        await (0, mongoose_1.connect)(process.env["MONGODB_LOGIN"]);
        //*Commands
        console.log((0, colors_1.yellow)("⌛ Initializing Commands...⌛"));
        const commandPath = path_1.default.join(__dirname, "..", "Commands");
        (0, fs_1.readdirSync)(commandPath).forEach((dir) => {
            try {
                //Possivel problema no momento de assinar os valores no "commands"
                let commands = (0, fs_1.readdirSync)(`${commandPath}/${dir}`).filter((file) => {
                    if (endsWithAny([".js", ".ts"], file))
                        return file;
                });
                for (const file of commands) {
                    const { command } = require(`${commandPath}/${dir}/${file}`);
                    this.commands.set(command.name, command);
                    if (command?.aliases.length !== 0) {
                        command.aliases.forEach((alias) => {
                            this.aliases.set(alias, command);
                        });
                    }
                }
                console.log(colors_1.green.bold(`✔ ${dir} - Commands loaded without any error. ✔`));
            }
            catch (error) {
                console.log(colors_1.red.bold(`❌ LOADING FAILURE - Failed to load folder "${dir ?? __dirname}". ❌`));
                throw error;
            }
        });
        //*Events
        console.log((0, colors_1.yellow)("⌛ Initializing Events...⌛"));
        const load_dir = async (dir) => {
            try {
                const eventPath = path_1.default.join(__dirname, "..", "Events", `${dir}`);
                const event_files = (0, fs_1.readdirSync)(eventPath).filter(async (file) => {
                    if (endsWithAny([".ts", ".js"], file)) {
                        return file;
                    }
                });
                for (const file of event_files) {
                    const { event } = await Promise.resolve().then(() => __importStar(require(`${eventPath}/${file}`)));
                    this.events.set(event.name, event);
                    this.on(event.name, event.run.bind(null, this));
                }
                console.log(colors_1.green.bold(`✔ ${dir} - Events loaded without any error. ✔`));
            }
            catch (error) {
                console.log(colors_1.red.bold(`❌ LOADING FAILURE - Failed to load folder "${dir ?? __dirname}". ❌`));
                throw error;
            }
        };
        ["Client", "Guild"].forEach(async (e) => await load_dir(e));
    }
}
exports.default = ExtendedClient;
function endsWithAny(suffixes, string) {
    return suffixes.some((suffix) => string.endsWith(suffix));
}
