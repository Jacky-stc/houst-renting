import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const apiKey: string = process.env.APIKEY || "";
        const sheetId: string = process.env.SHEETID || "";
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/員工帳密?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        const employeesAccount = new Map<
          string,
          { index: string; name: string; password: string }
        >();
        data.values.forEach((account: string[], index: number) => {
          employeesAccount.set(account[1], {
            index: index.toString(),
            name: account[0],
            password: account[2],
          });
        });
        if (
          employeesAccount.has(credentials?.username) &&
          employeesAccount.get(credentials?.username)?.password ===
            credentials?.password
        ) {
          return {
            id: employeesAccount.get(credentials?.username)?.index ?? "1",
            name: employeesAccount.get(credentials?.username)?.name,
            account: credentials.username,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 365 * 10, // 10 years in seconds
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token }) {
      const apiKey: string = process.env.APIKEY || "";
      const sheetId: string = process.env.SHEETID || "";
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/員工帳密?key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      const employeesName = new Set(data.values.map((row: string[]) => row[0]));
      if (employeesName.has(token.name)) {
        return token;
      }
      return {};
    },
    async session({ session, token }) {
      if (!token.name) {
        return {
          ...session,
          user: undefined,
        };
      }
      return session;
    },
  },
};
