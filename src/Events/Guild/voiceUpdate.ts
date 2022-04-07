import { VoiceState } from "discord.js";
import ExtendedClient from "../../Client";
import { Event } from "../../interfaces";

export const event:Event = {
    name: "voiceStateUpdate",
    run: async (client:ExtendedClient, oldState:VoiceState, newState:VoiceState) => {

        // if(oldState.channelId !== newState.channelId && newState.channelId !== null && newState.channelId === "929795783564345374") {
        // const date = new Date();
        
        // }
        
    }
}