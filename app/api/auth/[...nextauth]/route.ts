import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

// Define authOptions but do NOT export it

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
