import mongoose, { model, Schema, models } from "mongoose";
// Schema for a separate settings collection
const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
});

export const Settings = models.Settings || model("Settings", settingsSchema);
// Example document:
// {
//   key: "featuredProduct",
//   value: {
//     productId: "61234567890abcdef1234567",
//     price: 99.99
//   }
// }
