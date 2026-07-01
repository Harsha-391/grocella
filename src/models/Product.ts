import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IProduct extends Document {
  sku: string;
  name: string;
  price: number;
  unit: string;
  category: "grains" | "spices" | "beverages" | "organic" | "packaged";
  description: string;
  image: string; // Base64 data URL or external URL
  badge?: string;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    unit: {
      type: String,
      required: [true, "Unit size is required (e.g., 1 kg, 50 kg Bag)"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["grains", "spices", "beverages", "organic", "packaged"],
        message: "{VALUE} is not a valid category",
      },
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Product image (URL or Base64 string) is required"],
    },
    badge: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent compiling model multiple times during HMR
const Product = models.Product || model<IProduct>("Product", ProductSchema);

export default Product;
