import type { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Yandex from 'next-auth/providers/yandex';
import { prisma } from '../../lib/prisma';
import bcrypt from 'bcrypt';

interface Credentials{
  email: string,
  password: string
}

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
    Credentials({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: {label: 'email', type: 'email', placeholder: "Email"},
        password: {label: 'password', type: 'password', placeholder: "Password"}
      }, 
      async authorize(credentials): Promise<any> {
        const {email, password} = credentials as Credentials;
        if (credentials === null) return null;
        try {
          const user = await prisma.user.findFirst({
            where: {
              email: email,
            }
          })

          if (user) {
            const isMatch = (password && password.length > 0) ? await bcrypt.compare(
              password,
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