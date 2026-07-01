import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Auto-generate SKU if not provided
    if (!body.sku || body.sku.trim() === "") {
      const randomPart = Math.floor(1000 + Math.random() * 9000);
      const catPrefix = body.category ? body.category.substring(0, 3).toUpperCase() : "GEN";
      body.sku = `GF-${catPrefix}-${randomPart}`;
    }

    const product = await Product.create(body);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    // Handle unique SKU collision
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "Product SKU already exists. Please choose a unique SKU." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
