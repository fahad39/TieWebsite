import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import { Admins } from "@/models/Admins";

// Get admin emails directly from mongoose model
const fetchAdminEmails = async () => {
  try {
    await mongooseConnect();
    const adminList = await Admins.find();
    const adminEmails = adminList.map((admin) => admin.email);

    // Add hardcoded email for backup access
    adminEmails.push("fahadhussain0127@gmail.com");

    return adminEmails;
  } catch (error) {
    console.error("Error fetching admin emails from database:", error);
    // Fallback to hardcoded list in case of database issues
    return ["fahadhussain0127@gmail.com"];
  }
};

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session, token, user }) => {
      try {
        const adminEmails = await fetchAdminEmails(); // Fetch admin emails

        if (adminEmails.includes(session?.user?.email)) {
          return session;
        } else {
          return false;
        }
      } catch (error) {
        console.error("Error in session callback:", error);
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  try {
    const adminEmails = await fetchAdminEmails(); // Fetch admin emails

    const session = await getServerSession(req, res, authOptions);
    if (!adminEmails.includes(session?.user?.email)) {
      res.status(401);
      res.end();
      throw "not an admin";
    }
  } catch (error) {
    console.error("Error in isAdminRequest:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
