"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Edit3,
  Upload,
  ShoppingBag,
  Database,
  ArrowLeft,
  X,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader2,
  Package,
  BadgeCent
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ProductType {
  _id: string;
  sku: string;
  name: string;
  price: number;
  unit: string;
  category: "grains" | "spices" | "beverages" | "organic" | "packaged";
  description: string;
  image: string;
  badge?: string;
}

// Initial 12 seed products for easy setup
const SEED_PRODUCTS = [
  {
    name: "Premium Basmati Rice (Rozana)",
    price: 120,
    unit: "1 kg",
    category: "grains",
    description: "Extra long grains with rich aroma, aged to perfection. Perfect for daily meals and biryani.",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80",
    badge: "Best Seller"
  },
  {
    name: "Whole Green Mung Dal",
    price: 140,
    unit: "1 kg",
    category: "grains",
    description: "Naturally grown, high-protein organic green mung beans. Chemical-free farming from Rajasthani lands.",
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500&auto=format&fit=crop&q=80",
    badge: "Organic"
  },
  {
    name: "Lokwan Premium Wheat Flour (Atta)",
    price: 65,
    unit: "1 kg",
    category: "grains",
    description: "Stone-ground whole wheat flour. Retains all natural nutrients and fiber for soft, healthy rotis.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80",
    badge: "100% Pure"
  },
  {
    name: "Jodhpur Spicy Red Chili Powder",
    price: 280,
    unit: "500 g",
    category: "spices",
    description: "Vibrant red color with intense heat. Made from authentic Rajasthani Mathania chilis.",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=500&auto=format&fit=crop&q=80",
    badge: "Vibrant color"
  },
  {
    name: "Rajasthani Haldi (Turmeric) Powder",
    price: 160,
    unit: "500 g",
    category: "spices",
    description: "Pure turmeric with high curcumin content, offering deep color and strong medicinal benefits.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80",
    badge: "High Curcumin"
  },
  {
    name: "Bold Green Cardamom (Elaichi)",
    price: 650,
    unit: "100 g",
    category: "spices",
    description: "Aromatic bold green pods, handpicked for refreshing flavor in tea, desserts, and savory dishes.",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&auto=format&fit=crop&q=80",
    badge: "Export Quality"
  },
  {
    name: "Desi Cow Ghee (Bilona Method)",
    price: 750,
    unit: "1 L",
    category: "beverages",
    description: "Traditional hand-churned Vedic A2 ghee. Extremely nutritious, granular texture, rich aroma.",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80",
    badge: "A2 Vedic"
  },
  {
    name: "Royal CTC Tea (Rajasthani Blend)",
    price: 320,
    unit: "1 kg",
    category: "beverages",
    description: "A strong, granular CTC tea blended with aromatic spices for the authentic Rajasthani chai experience.",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500&auto=format&fit=crop&q=80",
    badge: "Strong Taste"
  },
  {
    name: "Premium Medjool Dates",
    price: 480,
    unit: "500 g",
    category: "organic",
    description: "Soft, sweet, and nutrient-dense premium quality imported dates. Great energy booster.",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=500&auto=format&fit=crop&q=80",
    badge: "Natural Sweet"
  },
  {
    name: "Premium Salted Pistachios",
    price: 340,
    unit: "250 g",
    category: "organic",
    description: "Crispy, oven-roasted, and lightly salted Californian pistachios. Healthy snack.",
    image: "https://images.unsplash.com/photo-1543218024-57a70143c369?w=500&auto=format&fit=crop&q=80",
    badge: "Premium Quality"
  },
  {
    name: "Traditional Rajasthani Baati Mix",
    price: 180,
    unit: "500 g",
    category: "packaged",
    description: "Ready-to-bake coarse wheat mix to prepare authentic, golden Rajasthani Baatis at home.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=80",
    badge: "Quick Cook"
  },
  {
    name: "Ker Sangri Traditional Pickle",
    price: 220,
    unit: "400 g",
    category: "packaged",
    description: "Traditional pickle prepared using wild desert berries (Ker) and beans (Sangri) with authentic spices and mustard oil.",
    image: "https://images.unsplash.com/photo-1589135306089-7153c5b6b15d?w=500&auto=format&fit=crop&q=80",
    badge: "Marwari Special"
  }
];

export default function AdminPanel() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState("");

  // Form Fields
  const [formData, setFormData] = useState<{
    sku: string;
    name: string;
    price: string;
    unit: string;
    category: "grains" | "spices" | "beverages" | "organic" | "packaged";
    description: string;
    image: string;
    badge: string;
  }>({
    sku: "",
    name: "",
    price: "",
    unit: "",
    category: "grains",
    description: "",
    image: "",
    badge: ""
  });

  // Fetch Products on Mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      } else {
        setErrorMsg(data.error || "Failed to load products");
      }
    } catch (e) {
      setErrorMsg("Network error occurred loading database products.");
    } finally {
      setLoading(false);
    }
  };

  // Convert uploaded image file to Base64
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image is too large. Please select an image under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      setErrorMsg("Please upload a product image (file upload or URL).");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const url = isEditing ? `/api/products/${editingId}` : "/api/products";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg(isEditing ? "Product updated successfully!" : "Product created successfully!");
        resetForm();
        fetchProducts();
      } else {
        setErrorMsg(data.error || "Operation failed.");
      }
    } catch (e) {
      setErrorMsg("Failed to connect to the API.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (product: ProductType) => {
    setIsEditing(true);
    setEditingId(product._id);
    setFormData({
      sku: product.sku,
      name: product.name,
      price: product.price.toString(),
      unit: product.unit,
      category: product.category,
      description: product.description,
      image: product.image,
      badge: product.badge || ""
    });
    // Scroll smoothly to top form
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const handleDeleteClick = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product? This action is permanent.")) return;

    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg("Product deleted successfully.");
        fetchProducts();
      } else {
        setErrorMsg(data.error || "Failed to delete product.");
      }
    } catch (e) {
      setErrorMsg("Error connecting to server to delete product.");
    }
  };

  const handleSeedDatabase = async () => {
    if (!confirm("This will seed the database with the 12 initial premium products. Continue?")) return;

    setSeeding(true);
    setErrorMsg("");
    setSuccessMsg("");

    let successCount = 0;
    try {
      for (const item of SEED_PRODUCTS) {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item)
        });
        const data = await res.json();
        if (data.success) successCount++;
      }

      setSuccessMsg(`Database seeded successfully! Uploaded ${successCount} products.`);
      fetchProducts();
    } catch (e) {
      setErrorMsg("An error occurred during database seeding.");
    } finally {
      setSeeding(false);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId("");
    setFormData({
      sku: "",
      name: "",
      price: "",
      unit: "",
      category: "grains",
      description: "",
      image: "",
      badge: ""
    });
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Banner Section */}
        <section className="bg-grocella-900 text-white py-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-grocella-300 text-xs font-bold uppercase tracking-widest bg-grocella-800 px-3 py-1 rounded-full">
                Grocella Admin Console
              </span>
              <h1 className="text-3xl font-serif font-black mt-3">Product Upload & DB Panel</h1>
              <p className="text-grocella-100 text-sm mt-2 max-w-2xl font-light">
                Manage the live catalog connected to MongoDB. Add custom organic grains or whole spices, edit prices, delete items, or seed the catalog automatically.
              </p>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={handleSeedDatabase}
                disabled={seeding || loading}
                className="bg-grocella-accent hover:bg-amber-600 text-white px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50"
              >
                {seeding ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Seeding DB...
                  </>
                ) : (
                  <>
                    <Database className="w-4.5 h-4.5" /> Seed Initial Catalog (12 Items)
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Message banners */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl text-xs font-semibold flex items-center gap-2.5 shadow-sm">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2.5 shadow-sm">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}
        </div>

        {/* Form and List Layout */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-3 gap-8">
          
          {/* Left Column: Form Creator/Editor */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-150 rounded-3xl p-6.5 shadow-sm sticky top-28">
              <h3 className="font-serif font-black text-slate-900 text-lg border-b border-slate-100 pb-3.5 mb-5 flex items-center justify-between">
                <span>{isEditing ? "Edit Product" : "Upload Product"}</span>
                {isEditing && (
                  <button
                    onClick={resetForm}
                    className="text-slate-400 hover:text-slate-600 text-xs font-semibold flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg"
                  >
                    Cancel Edit
                  </button>
                )}
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-655 mb-1.5">Product Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Jodhpur Red Chili Powder"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-grocella-700 bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-655 mb-1.5">Price (₹ INR)</label>
                    <input
                      type="number"
                      required
                      min="0.01"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="280"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-grocella-700 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-655 mb-1.5">Unit Size</label>
                    <input
                      type="text"
                      required
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      placeholder="e.g. 500 g, 50 kg Bag"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-grocella-700 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-655 mb-1.5">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-grocella-700 bg-slate-50 cursor-pointer"
                    >
                      <option value="grains">Cereals & Grains</option>
                      <option value="spices">Spices & Herbs</option>
                      <option value="beverages">Dairy & Beverages</option>
                      <option value="organic">Organic & Health</option>
                      <option value="packaged">Frozen & Packaged</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-655 mb-1.5">Custom Badge (Optional)</label>
                    <input
                      type="text"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="e.g. Organic, Pure"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-grocella-700 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block font-semibold text-slate-655 mb-1.5">Product SKU (Optional)</label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
                      placeholder="Auto-generated if left blank"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-grocella-700 bg-slate-50 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-655 mb-1.5">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide a detailed description of origin, nutritional value, and packaging..."
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-grocella-700 bg-slate-50 resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-semibold text-slate-655 mb-1.5">Product Image</label>
                  <div className="space-y-3.5">
                    {/* Paste URL */}
                    <input
                      type="text"
                      value={formData.image.startsWith("data:") ? "" : formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Paste Image URL or select file below..."
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-grocella-700 bg-slate-50"
                    />

                    {/* Upload File */}
                    <label className="border-2 border-dashed border-slate-250 hover:border-grocella-700 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-50 text-slate-500 hover:text-grocella-700">
                      <Upload className="w-6 h-6 mb-1.5" />
                      <span className="font-semibold text-[10px]">Select File (Base64 conversion)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {formData.image && (
                    <div className="mt-3.5 border border-slate-200 rounded-xl overflow-hidden aspect-video relative group">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                        className="absolute top-2 right-2 bg-slate-900/60 hover:bg-slate-900 text-white rounded-full p-1 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-grocella-700 text-white rounded-xl font-bold hover:bg-grocella-800 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-grocella-700/20 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" /> {isEditing ? "Save Product Changes" : "Upload Product to MongoDB"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Database Products List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-slate-150 rounded-3xl p-6 shadow-sm">
              <h3 className="font-serif font-black text-slate-900 text-lg flex items-center gap-2 border-b border-slate-100 pb-3 mb-4.5">
                <Package className="text-grocella-700 w-5.5 h-5.5" /> Database Catalog ({products.length} Products)
              </h3>

              {loading ? (
                <div className="py-20 text-center text-slate-500">
                  <Loader2 className="w-10 h-10 animate-spin mx-auto text-grocella-700 mb-3" />
                  <p className="text-xs font-semibold">Connecting to MongoDB database...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="py-20 text-center text-slate-450 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                  <Database className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h4 className="font-bold text-sm text-slate-800">Database is empty</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto font-light leading-relaxed">
                    Click the "Seed Initial Catalog" button at the top to quickly seed 12 premium Marwari agricultural and spice products.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-150">
                  {products.map((product) => (
                    <div key={product._id} className="py-4.5 flex gap-4 items-center group">
                      {/* Image */}
                      <div className="h-16 w-16 rounded-xl border border-slate-150 overflow-hidden flex-shrink-0 bg-slate-50">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-grow">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[9px] text-slate-450 font-bold bg-slate-100 px-2 py-0.5 rounded uppercase">
                            {product.sku}
                          </span>
                          <span className="text-[10px] text-grocella-700 font-bold uppercase tracking-wider">
                            {product.category}
                          </span>
                          {product.badge && (
                            <span className="bg-amber-100 text-amber-800 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                              {product.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-slate-805 text-sm mt-1">{product.name}</h4>
                        <p className="text-[11px] text-slate-500 font-light mt-0.5 line-clamp-1 max-w-md">
                          {product.description}
                        </p>
                      </div>

                      {/* Pricing and Actions */}
                      <div className="text-right flex-shrink-0 flex items-center gap-6">
                        <div>
                          <p className="text-xs text-slate-500">Price / {product.unit}</p>
                          <p className="text-sm font-serif font-black text-grocella-900 mt-0.5">₹{product.price}</p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditClick(product)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-650 p-2.5 rounded-xl transition-all active:scale-95"
                            title="Edit Product"
                          >
                            <Edit3 className="w-4.5 h-4.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(product._id)}
                            className="bg-red-50 hover:bg-red-100 text-red-500 p-2.5 rounded-xl transition-all active:scale-95"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
