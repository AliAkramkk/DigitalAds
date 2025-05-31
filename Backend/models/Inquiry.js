// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: String,
  email: String,
  service: String,
  message: String,
  phone: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;
// module.exports = mongoose.model('Inquiry', inquirySchema);
