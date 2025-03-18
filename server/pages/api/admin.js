import { Admins } from "@/models/Admins";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  const checkmongoose = await mongooseConnect();
  // console.log(checkmongoose, "Mongo connect");
  await isAdminRequest(req, res);

  if (method === "GET") {
    try {
      console.log("inside api");
      res.json(await Admins.find());
    } catch (error) {
      console.log("admin get api:", error);
    }
  }

  if (method === "POST") {
    try {
      const { email } = req.body;
      const NewAdmin = await Admins.create({
        email,
      });
      res.json(NewAdmin);
    } catch (error) {
      console.log("admin post api:", error);
    }
  }

  if (method === "DELETE") {
    try {
      if (req.query?.id) {
        await Admins.deleteOne({ _id: req.query?.id });
        res.json(true);
      }
    } catch (error) {
      res.json(false);
      console.log("admin delete api:", error);
    }
  }
}
