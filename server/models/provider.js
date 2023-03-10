const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProviderSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is Required"] },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Provider = mongoose.model("Provider", ProviderSchema);
module.exports = Provider;
