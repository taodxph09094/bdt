const mongoose = require("mongoose");
const statisticalSchema = new mongoose.Schema({
  budget: {
    type: Number,
    default: 0,
  },
  sales: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Statistical", statisticalSchema);
