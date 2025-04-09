import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/app/models/user";
import connectToDatabase from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions = {
  session: {
    strategy: "jwt" as const,
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials?.email });
          if (!user) {
            throw new Error("No user found with that email.");
          }
          const isValidPassword = await bcrypt.compare(
            credentials?.password ?? "",
            user.password as string
          );
          if (!isValidPassword) {
            throw new Error("Invalid password.");
          }
          return user;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Updated signIn callback with the correct signature
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "github" || account?.provider === "google") {
        await connectToDatabase();
        // Using profile from OAuth will have the email, but include a fallback if needed
        const userEmail = profile?.email || email;
        if (userEmail) {
          const existingUser = await User.findOne({ email: userEmail });
          if (!existingUser) {
            await User.create({
              name: profile?.name || (userEmail ? userEmail.split("@")[0] : "Unknown"),
              email: userEmail,
              provider: account?.provider,
            });
          }
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.provider = account?.provider || "credentials";
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email as string,
          name: token.name as string,
          provider: token.provider,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
