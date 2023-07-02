import type { DefaultSession, NextAuthOptions } from "next-auth";
import type { DiscordProfile } from "next-auth/providers/discord";
import DiscordProvider from "next-auth/providers/discord";
import { env } from "../env.mjs";
import type { RESTGetAPICurrentUserGuildsResult } from "discord-api-types/v10";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      image: string;
      guilds: string[];
    };
  }

  interface User {
    id: string;
    name: string;
    image: string;
    guilds: string[];
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "identify guilds"
        }
      },

      profile: async (profile: DiscordProfile, tokens) => {
        if (!tokens.access_token)
          throw new Error("no access token?");

        // fetch data from Discord API
        const data = await fetch("https://discord.com/api/users/@me/guilds", {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          }
        }).catch(err => {
          console.error(err);
          return null;
        }).then(res => res?.json() as RESTGetAPICurrentUserGuildsResult | undefined);

        if (!data)
          throw new Error("Failed to fetch guilds from Discord API");

        const guildIds = data.map(guild => guild.id);

        // parse avatar
        if (profile.avatar) {
          const format = profile.avatar.startsWith("a_") ? "gif" : "png"
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
        } else {
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${Number(profile.discriminator) % 5}.png`
        }

        return {
          id: profile.id,
          name: profile.username,
          image: profile.image_url,
          // "compress" the numbers a bit by using base36
          guilds: guildIds,
        }
      }
    }),
  ],

  callbacks: {
    // Add the guilds to the JWT token
    jwt: ({ token, user, account }) => {
      if (account) {
        token.guilds = user.guilds;
      }

      return token;
    },

    // expose the guilds to the client
    session: ({ session, token }) => {
      session.user.guilds = token.guilds as string[];
      return session;
    },

  }
}