import Mongoose from "mongoose";

const driverSchema = new Mongoose.Schema({
    name: String,
      enum: ['John', 'Satoshi', 'Lucas', 'Maria'],
    day:{
      type: String,
      enum: ['Friday', 'Today', 'Thursday']
    }
});

export const driverModel = Mongoose.model('driver', driverSchema);
