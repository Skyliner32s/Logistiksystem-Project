import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    name: String,
    time: String
})

export const orderModel = mongoose.model('order', orderSchema);