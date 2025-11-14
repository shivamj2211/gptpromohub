import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prismadb"
import { sendVerificationRequest } from "@/lib/email"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    EmailProvider({
      from: "noreply@colabatr.com",
      sendVerificationRequest,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token }: { token: any }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email! },
      })
      token.isAdmin = dbUser?.isAdmin || false
      token.isSeller = dbUser?.isSeller || false
      return token
    },
    async session({ token, session }: { token: any; session: any }) {
      if (token && session.user) {
        (session.user as any).isAdmin = token.isAdmin
        ;(session.user as any).isSeller = token.isSeller
      }
      return session
    },
  },
  pages: {
    signIn: "/api/auth/signin",
  },
}
