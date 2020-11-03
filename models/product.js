const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  categoryid: { type: Schema.Types.ObjectId, ref: 'Category'},
  name: String,
  imageurl: String,
  quantity: Number,
  price: Number
});

module.exports = mongoose.model('Product', ProductSchema);