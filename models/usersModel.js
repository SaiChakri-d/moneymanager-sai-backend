import mongoose from "mongoose";
import bcrypt from "bcrypt";
import createToken from "../helpers/createToken.js";

const usersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    budget: {
      type: String,
      required: false,
      default: "0",
    },

    img: {
      type: String,
      required: false,
      default: "img",
    },

    token: {
      type: String,
      default: createToken(),
    },

    confirmed: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

// ====== Hash the password ====== //

usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // this is for know if the password was hashed
    next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

// Check if password is correct
usersSchema.methods.checkPassword = async function (passForm) {
  return await bcrypt.compare(passForm, this.password);
};

const Users = mongoose.model("usersBudget", usersSchema);

export default Users;
