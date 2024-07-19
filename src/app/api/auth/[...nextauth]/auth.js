// src/app/api/auth/[...nextauth]/auth.js

import CredentialsProvider from "next-auth/providers/credentials";
import db from '../../../../libs/db';
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        try {
          const userFound = await db.user.findUnique({
            where: {
              email: credentials.email
            }
          });

          if (!userFound) throw new Error('No user found');

          const matchPassword = await bcrypt.compare(credentials.password, userFound.password);

          if (!matchPassword) throw new Error('Wrong password');

          return {
            id: userFound.id,
            name: userFound.username,
            email: userFound.email,
          };
        } catch (error) {
          console.error('Authorization error:', error);
          throw new Error('Authorization failed');
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};