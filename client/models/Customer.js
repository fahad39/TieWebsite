import mongoose, { model, Schema, models } from "mongoose";

const CustomerSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    country: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Customers = models.Customers || model("Customers", CustomerSchema);
