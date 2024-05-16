import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { env } from "@/env.mjs";

import { getUserByEmail } from "./lib/user";
import { LoginSchema } from "./lib/validations/schema";

// import { siteConfig } from "@/config/site"
// import { getUserByEmail } from "@/lib/user";
// import MagicLinkEmail from "@/emails/magic-link-email"
// import { prisma } from "@/lib/db"

export default {
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    // Resend({
    //   apiKey: env.RESEND_API_KEY,
    //   from: "onboarding@resend.dev",
    // }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
    // Email({
    //   sendVerificationRequest: async ({ identifier, url, provider }) => {
    //     const user = await getUserByEmail(identifier);
    //     if (!user || !user.name) return null;

    //     const userVerified = user?.emailVerified ? true : false;
    //     const authSubject = userVerified
    //       ? `Sign-in link for ${siteConfig.name}`
    //       : "Activate your account";

    //     try {
    //       const { data, error } = await resend.emails.send({
    //         from: "SaaS Starter App <onboarding@resend.dev>",
    //         to:
    //           process.env.NODE_ENV === "development"
    //             ? "delivered@resend.dev"
    //             : identifier,
    //         subject: authSubject,
    //         react: MagicLinkEmail({
    //           firstName: user?.name as string,
    //           actionUrl: url,
    //           mailType: userVerified ? "login" : "register",
    //           siteName: siteConfig.name,
    //         }),
    //         // Set this to prevent Gmail from threading emails.
    //         // More info: https://resend.com/changelog/custom-email-headers
    //         headers: {
    //           "X-Entity-Ref-ID": new Date().getTime() + "",
    //         },
    //       });

    //       if (error || !data) {
    //         throw new Error(error?.message);
    //       }

    //       // console.log(data)
    //     } catch (error) {
    //       throw new Error("Failed to send verification email.");
    //     }
    //   },
    // }),
  ],
} satisfies NextAuthConfig;
