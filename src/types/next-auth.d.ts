// src/types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      provider?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name: string;
    provider?: string;
  }

  interface JWT {
    id?: string;
    email?: string;
    name?: string;
    provider?: string;
  }
}