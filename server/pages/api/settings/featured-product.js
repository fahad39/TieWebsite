import { Product } from "@/models/Product";
import { Settings } from "@/models/Settings"; // You'll need to create this model
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  // For fetching the featured product setting
  if (method === "GET") {
    try {
      // Find the setting with key "featuredProduct"
      const featuredProductSetting = await Settings.findOne({
        key: "featuredProduct",
      });

      if (featuredProductSetting) {
        // If setting exists, return it
        res.json(featuredProductSetting.value);
      } else {
        // If no setting found, return empty object
        res.json({});
      }
    } catch (error) {
      console.error("Error fetching featured product setting:", error);
      res
        .status(500)
        .json({ error: "Error fetching featured product setting" });
    }
  }

  // For saving/updating the featured product setting
  if (method === "POST") {
    try {
      const { productId, price } = req.body;

      // Validate that the product exists
      if (productId) {
        const productExists = await Product.findById(productId);
        if (!productExists) {
          return res.status(400).json({ error: "Product not found" });
        }
      }

      // Update or create the setting
      const updatedSetting = await Settings.findOneAndUpdate(
        { key: "featuredProduct" },
        {
          key: "featuredProduct",
          value: { productId, price: parseFloat(price) },
        },
        { upsert: true, new: true }
      );

      res.json(updatedSetting.value);
    } catch (error) {
      console.error("Error saving featured product setting:", error);
      res.status(500).json({ error: "Error saving featured product setting" });
    }
  }
}
