import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Yandex from 'next-auth/providers/yandex';
import { prisma } from '../../lib/prisma';
import bcrypt from 'bcrypt';

export const authConfig : AuthOptions = {
  session: {
    strategy: 'jwt'
  },
  pages: {
    error: "/dashboard/login"
  },
  providers: [
    Yandex({
      clientId: process.env.AUTH_YANDEX_ID as string,
      clientSecret: process.env.AUTH_YANDEX_SECRET!,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials === null) return null;
        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials?.email,
            }
          })

          if (user) {
            const isMatch = (credentials?.password && credentials.password.length > 0) ? await bcrypt.compare(
              credentials.password,
              user.password
            ) : false;

            if (isMatch) { 
              return user; 
            } else {
              throw new Error("Check your password");
            }
          } else {
            throw new Error("User not found");
          }

        } 
        catch (error) {
           throw new Error(error);
        }
      }
    }),
  ]
}