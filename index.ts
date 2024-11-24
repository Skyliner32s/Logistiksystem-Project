import mongoose, { set } from "mongoose";
import Elysia from "elysia";
import { warehouseModel } from "./schemas/warehouse";
import { driverModel } from "./schemas/drivers";
import { productModel } from "./schemas/products";
import { pickerModel } from "./schemas/pickers";
import { orderModel } from "./schemas/orders";



const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://lucasmilla:hU6e659PTFB6fxKQ@mongotest.rilw3.mongodb.net/?retryWrites=true&w=majority&appName=MongoTest');
  console.log('Connected to MongoDB');
}

const app = new Elysia()

//driver
app.post('/driver/', async (req) =>{
  try {
     const newDriver = await driverModel.create(req.body);
     return { status: 'success', data: newDriver };
  } catch (err) {
    req.set.status = 400;
    return { status: 'error', message: err.message };
  }});

  app.delete('/driver/delete/:id', async (req) => {
    const { id } = req.params;
      try{
        const deletedDriver = await driverModel.findByIdAndDelete(id);
        if (!deletedDriver) {
          return { status: 'error', message: 'Driver not found' };
        }
        return { status: 'success', data: deletedDriver };
      } catch (err) {
        req.set.status = 400;
        return { status: 'error', message: err.message };
      }
    });

    app.get('/driver/friday/', async () => {
      try{
        const driver = await driverModel.find({ day: 'Friday' });
        return { status: 'success', data: driver };
      } catch (err) {
        return { status: 'error', message: err.message };
      }
    });
    app.get('/driver/today/', async () => {
      try{
        const driver = await driverModel.find({ day: 'Today' });
        return { status: 'success', data: driver };
      } catch (err) {
        return { status: 'error', message: err.message };
      }
    });
// warehouse
  app.post("/warehouse", async ({ body, set }) => {
    let newWarehouse = new warehouseModel();
    newWarehouse.name = body.name;
    newWarehouse.street = body.street;
    newWarehouse.zipcode = body.zipcode;
    try {
      await newWarehouse.save();
    } catch (error) {
      set.status = 400;
      return error;
    }
    return newWarehouse;
  });

  app.delete('/warehouse/delete/:id', async (req) => {
    const { id } = req.params;
      try{
        const deletedWarehouse = await warehouseModel.findByIdAndDelete(id);
        if (!deletedWarehouse) {
          return { status: 'error', message: 'Warehouse not found' };
        }
        return { status: 'success', data: deletedWarehouse };
      } catch (err) {
        req.set.status = 400;
        return { status: 'error', message: err.message };
      }
    })

   app.get('/warehouse/banana/', async () => {
    try{
      const warehouse = await warehouseModel.find();
      return { status: 'success', data: warehouse };
    } catch (err) {
      return { status: 'error', message: err.message };
    }
  })

// Products    
app.post('/product/', async (req) =>{
  try {
     const newProduct = await productModel.create(req.body);
     return { status: 'success', data: newProduct };
  } catch (err) {
    req.set.status = 400;
    return { status: 'error', message: err.message };
  }});

app.delete('/product/delete/:id', async (req) => {
  const { id } = req.params;
    try{
      const deletedProduct = await productModel.findByIdAndDelete(id);
      if (!deletedProduct) {
        return { status: 'error', message: 'Product not found' };
      }
      return { status: 'success', data: deletedProduct };
    } catch (err) {
      req.set.status = 400;
      return { status: 'error', message: err.message };
    }
  })

  app.get('/product/banana/', async () => {
    try{
      const product = await productModel.find({product: "Banana"});
      return { status: 'success', data: product };
    } catch (err) {
      return { status: 'error', message: err.message };
    }
  });

  app.get('/product/strawberry/', async () => {
    try{
      const product = await productModel.find({product: "Strawberry"});
      return { status: 'success', data: product };
    } catch (err) {
      return { status: 'error', message: err.message };
    }
  })   

//pickers
app.post('/pickers', async ({body, set}) =>{
  let newPicker = new pickerModel();
    newPicker.name = body.name;
    newPicker.day = body.day;
    newPicker.orders = body.orders;
    try{
      await newPicker.save();
    } catch (error){
      set.status = 418;
      return error
    }
    return newPicker
});

app.get('/pickers/none/', async () => {
  try{
    const picker = await pickerModel.find({orders: "none"});
    return { status: 'success', data: picker };
  } catch (err) {
    return { status: 'error', message: err.message };
  }
})  

app.get('/pickers/all/', async () => {
  try{
    const picker = await pickerModel.find();
    return { status: 'success', data: picker };
  } catch (err) {
    return { status: 'error', message: err.message };
  }
})  

//orders
app.post('/orders', async ({body, set}) =>{
  let newOrder = new orderModel();
    newOrder.name = body.name;
    newOrder.time = body.time;
    try{
      await newOrder.save();
    } catch (error){
      set.status = 418;
      return error
    }
    return newOrder
});

app.get('/orders/now/', async () => {
  try{
    const order = await orderModel.find({time: "Now"});
    return { status: 'success', data: order };
  } catch (err) {
    return { status: 'error', message: err.message };
  }
})   


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});