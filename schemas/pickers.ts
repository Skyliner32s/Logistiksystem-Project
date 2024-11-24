import mongoose from "mongoose";

const pickerSchema = new mongoose.Schema({
    name: String,
    day: String,
    orders: String
})

export const pickerModel = mongoose.model('picker', pickerSchema);

