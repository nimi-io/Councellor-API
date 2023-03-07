import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { NextFunction } from "connect";

export interface UserDocument extends mongoose.Document {
 // _id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePasswords(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
   // _id: { type: "string", required: true, unique: true },
    email: { type: "string", required: true, unique: true },
    name: { type: "string", required: true, unique: false },
    password: { type: "string", required: true, unique: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next: NextFunction) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePasswords = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

// userSchema.post("find", async function (next: NextFunction) {
//   let user = this as unknown as UserDocument;
// })

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
