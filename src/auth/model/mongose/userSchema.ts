import mongoose, { Schema, InferSchemaType, Model } from "mongoose";
export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
export const User = mongoose.model("user", UserSchema);
