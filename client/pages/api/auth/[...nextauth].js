import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import { Customers } from "@/models/Customer";

// Get admin emails directly from mongoose model
const fetchCustomerEmails = async () => {
  try {
    await mongooseConnect();
    const customerList = await Customers.find();
    const customerEmails = customerList.map((customer) => customer.email);
    return customerEmails;
  } catch (error) {
    console.error("Error fetching admin emails from database:", error);
    return ["fahadhussain0127@gmail.com"]; // Fallback to hardcoded list
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
        await mongooseConnect();

        // Check if the customer exists in the database
        let customer = await Customers.findOne({ email: session.user.email });

        if (!customer) {
          // If the customer doesn't exist, create a new record
          customer = await Customers.create({
            name: session.user.name,
            email: session.user.email,
            createdAt: new Date(),
          });
        }

        // Attach customer data to the session
        session.customer = {
          id: customer._id,
          name: customer.name,
          email: customer.email,
        };

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

export async function isCustomerRequest(req, res) {
  try {
    const customerEmails = await fetchCustomerEmails(); // Fetch admin emails

    const session = await getServerSession(req, res, authOptions);
    if (!customerEmails.includes(session?.user?.email)) {
      res.status(401);
      res.end();
      throw "not a customer";
    }
  } catch (error) {
    console.error("Error in isCustomerRequest:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
