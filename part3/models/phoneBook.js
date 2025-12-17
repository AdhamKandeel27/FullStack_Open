import mongoose from "mongoose";
import "dotenv/config";

const url = process.env.DATABASE_URL;

mongoose.set("strictQuery", false);

mongoose
  .connect(url, { family: 4 })
  .then(() => {
    console.log("CONNECTED TO DATABASE");
  })
  .catch((error) => {
    console.log("ERROR CONNECTING TO MONGODB", error.message);
  });

const phoneBookSchema = new mongoose.Schema({
  name:{
    type:String,
    minLength:3,
    required:true
  },
  number: String,
});

phoneBookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Contact", phoneBookSchema);
