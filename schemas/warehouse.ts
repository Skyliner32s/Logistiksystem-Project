import Mongoose from 'mongoose'

const warehouseSchema = new Mongoose.Schema({
    name: String,
    products: [String],
    street: String,
    city: String,
    zipcode: {type: String, minLength: 4, maxLength: 5}
});

export const warehouseModel = Mongoose.model("Warehouse", warehouseSchema);

/*{
  "name": "Centrallagret",
  "street": "Folkungagatan 96",
  "zipcode": "A1298"
}*/