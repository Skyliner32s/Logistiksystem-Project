import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    product:{
      type: String,
      enum: ['Banana', 'Strawberry']
    },
    storing:{
      type: String,
      enum: ['Järfälla', 'Stockholm']
    },
    amount:{
      type: Number,
      min: 0, max: 999
    }
});

export const productModel = mongoose.model('product', productSchema);
