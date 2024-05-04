import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { username, password } = credentials;

        try {
          const resLogin = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/auth/api/v4/login`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({
                username,
                password,
              }),
            }
          );
          let data = await resLogin.json();

          console.log("user login", data);

          if (resLogin.status == 200) {
            return data;
          } else {
            throw new Error(data.detail);
          }
        } catch (error) {
          if (error.cause.code == "ECONNREFUSED") {
            throw new Error("Server Error");
          }
          throw new Error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/403",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
