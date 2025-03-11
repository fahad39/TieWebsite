import mongoose, { model, Schema, models } from "mongoose";

const AdminSchema = new Schema(
  {
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Admins = models.Admins || model("Admins", AdminSchema);
