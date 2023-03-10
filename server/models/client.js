const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClientSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is Required"] },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is Required"],
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, "Client phone number required"],
    },
    provider: {
      type: [{ type: Schema.Types.ObjectId, ref: "Provider" }],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;
