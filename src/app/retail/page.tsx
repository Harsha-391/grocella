"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  Plus,
  X,
  CreditCard,
  Truck,
  Download,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Database,
  Loader2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "grains", label: "Cereals & Grains" },
  { id: "spices", label: "Spices & Herbs" },
  { id: "beverages", label: "Dairy & Beverages" },
  { id: "organic", label: "Organic & Health" },
  { id: "packaged", label: "Frozen & Packaged" }
];

function RetailStoreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { cart, addToCart, cartTotal, cartCount, clearCart } = useCart();

  // State Management
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [dbLoading, setDbLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Checkout Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Rajasthan",
    zip: "",
    payment: "cod"
  });

  // Fetch products from MongoDB
  const fetchProducts = async () => {
    setDbLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setDbProducts(data.data);
      }
    } catch (e) {
      console.error("Failed to load database products:", e);
    } finally {
      setDbLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Load category from query string if available
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && CATEGORIES.some((c) => c.id === cat)) {
      setSelectedCategory(cat);
    }

    const chk = searchParams.get("checkout");
    if (chk === "true") {
      setShowCheckout(true);
    }
  }, [searchParams]);

  // Filter & Sort Logic
  const filteredProducts = dbProducts.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0; // default order
  });

  // Calculate delivery fee
  const deliveryFee = cartTotal >= 500 ? 0 : 50;
  const gstFee = Math.round(cartTotal * 0.05); // 5% GST on organic food items
  const finalTotal = cartTotal + deliveryFee + gstFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order placement
    const randomId = "GF-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setOrderSuccess(true);
    clearCart();
    // Remove query params
    router.replace("/retail");
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setOrderSuccess(false);
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
            <span className="text-grocella-300 text-xs font-bold uppercase tracking-widest bg-grocella-800 px-3 py-1 rounded-full">
              Direct to Consumer (B2C) Store
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-black mt-3">Grocella Retail Shop</h1>
            <p className="text-grocella-100 text-sm mt-2 max-w-2xl font-light">
              Explore Rajasthani purity, organic grains, premium whole spices, and dairy products. Shipped directly to your home with FSSAI quality guarantee.
            </p>
          </div>
        </section>

        {/* Filter bar */}
        <section className="bg-white border-b border-slate-200 sticky top-20 z-40 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Categories */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      router.push(`/retail?category=${cat.id}`);
                    }}
                    className={`px-4.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? "bg-grocella-700 text-white shadow-md"
                        : "bg-slate-100 text-slate-650 hover:bg-slate-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search & Sort */}
              <div className="flex items-center gap-3">
                <div className="relative flex-grow md:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search product..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-grocella-700 focus:border-transparent bg-slate-50"
                  />
                </div>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-slate-55 border border-slate-200 rounded-xl pl-4 pr-9 py-2 text-xs font-semibold text-slate-650 focus:outline-none cursor-pointer"
                  >
                    <option value="default">Sort: Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {dbLoading ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-xs">
              <Loader2 className="w-10 h-10 animate-spin mx-auto text-grocella-700 mb-3" />
              <p className="text-xs text-slate-500 font-semibold">Loading Grocella product catalog...</p>
            </div>
          ) : dbProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-150 p-8 shadow-xs max-w-xl mx-auto">
              <Database className="w-14 h-14 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-serif font-black text-slate-900">Catalog is empty</h3>
              <p className="text-xs text-slate-500 mt-2 font-light leading-relaxed">
                Connect to the admin panel database to seed initial organic products or upload new ones.
              </p>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 mt-6 bg-grocella-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-grocella-800 transition-colors shadow-sm"
              >
                Go to Admin Dashboard
              </Link>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
              <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-800">No products found</h3>
              <p className="text-sm text-slate-500 mt-1">Try adjusting your filters or search keywords.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const prodId = product._id || product.id;
                return (
                  <div
                    key={prodId}
                    className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square bg-slate-50 overflow-hidden">
                      {product.badge && (
                        <span className="absolute top-3 left-3 bg-grocella-750 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md z-10 shadow-sm">
                          {product.badge}
                        </span>
                      )}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-grow flex flex-col">
                      <span className="text-[10px] text-slate-450 uppercase tracking-widest font-semibold">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm mt-1.5 line-clamp-1 group-hover:text-grocella-700 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-slate-500 text-xs font-light mt-1.5 line-clamp-2 leading-relaxed flex-grow">
                        {product.description}
                      </p>

                      <div className="border-t border-slate-100 my-4"></div>

                      <div className="flex items-center justify-between mt-auto">
                        <div>
                          <p className="text-xs text-slate-500 font-medium">Price / {product.unit}</p>
                          <p className="text-lg font-serif font-black text-grocella-900 mt-0.5">₹{product.price}</p>
                        </div>

                        <button
                          onClick={() => addToCart({
                            id: prodId,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            category: product.category,
                            unit: product.unit
                          })}
                          className="bg-grocella-700 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-grocella-800 transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Checkout Page Overlay */}
      {showCheckout && (
        <div className="fixed inset-0 z-150 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              onClick={handleCloseCheckout}
              className="fixed inset-0 bg-slate-900/60 transition-opacity backdrop-blur-xs"
            ></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-slate-100">
              <div className="absolute right-6 top-6 z-10">
                <button
                  onClick={handleCloseCheckout}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-550 rounded-full p-2.5 transition-colors focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!orderSuccess ? (
                <div className="grid md:grid-cols-5 h-full">
                  {/* Form input */}
                  <form onSubmit={handleCheckoutSubmit} className="md:col-span-3 p-8 sm:p-10">
                    <h2 className="text-2xl font-serif font-black text-slate-900 flex items-center gap-2">
                      <CreditCard className="text-grocella-700 w-6 h-6" /> Checkout Details
                    </h2>
                    <p className="text-xs text-slate-550 mt-1 font-light">
                      Please enter your shipping address and contact info to place the order.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-slate-650 mb-1.5">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-2.5 border border-slate-205 rounded-xl text-xs focus:ring-2 focus:ring-grocella-700 focus:border-transparent outline-none bg-slate-50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-655 mb-1.5">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="rahul@example.com"
                          className="w-full px-4 py-2.5 border border-slate-205 rounded-xl text-xs focus:ring-2 focus:ring-grocella-700 focus:border-transparent outline-none bg-slate-50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-655 mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="98765 XXXXX"
                          className="w-full px-4 py-2.5 border border-slate-205 rounded-xl text-xs focus:ring-2 focus:ring-grocella-700 focus:border-transparent outline-none bg-slate-50"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-slate-655 mb-1.5">Delivery Address</label>
                        <textarea
                          required
                          rows={3}
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Apartment, Street Name, Landmark"
                          className="w-full px-4 py-2.5 border border-slate-205 rounded-xl text-xs focus:ring-2 focus:ring-grocella-700 focus:border-transparent outline-none bg-slate-50 resize-none"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-655 mb-1.5">City</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="e.g. Jaipur"
                          className="w-full px-4 py-2.5 border border-slate-205 rounded-xl text-xs focus:ring-2 focus:ring-grocella-700 focus:border-transparent outline-none bg-slate-50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-655 mb-1.5">Postal Code (PIN)</label>
                        <input
                          type="text"
                          required
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          placeholder="302001"
                          className="w-full px-4 py-2.5 border border-slate-205 rounded-xl text-xs focus:ring-2 focus:ring-grocella-700 focus:border-transparent outline-none bg-slate-50"
                        />
                      </div>

                      <div className="col-span-2 mt-2">
                        <label className="block text-xs font-semibold text-slate-655 mb-2">Payment Method</label>
                        <div className="grid grid-cols-2 gap-3">
                          <label className={`border rounded-xl p-3 flex items-center gap-2 cursor-pointer transition-all ${
                            formData.payment === "cod" ? "border-grocella-700 bg-grocella-50/50" : "border-slate-200 hover:bg-slate-50"
                          }`}>
                            <input
                              type="radio"
                              name="payment"
                              value="cod"
                              checked={formData.payment === "cod"}
                              onChange={() => setFormData({ ...formData, payment: "cod" })}
                              className="accent-grocella-700"
                            />
                            <div>
                              <p className="text-xs font-bold text-slate-800">Cash on Delivery</p>
                              <p className="text-[10px] text-slate-500 font-light mt-0.5">Pay in cash on arrival</p>
                            </div>
                          </label>

                          <label className={`border rounded-xl p-3 flex items-center gap-2 cursor-pointer transition-all ${
                            formData.payment === "upi" ? "border-grocella-700 bg-grocella-50/50" : "border-slate-200 hover:bg-slate-50"
                          }`}>
                            <input
                              type="radio"
                              name="payment"
                              value="upi"
                              checked={formData.payment === "upi"}
                              onChange={() => setFormData({ ...formData, payment: "upi" })}
                              className="accent-grocella-700"
                            />
                            <div>
                              <p className="text-xs font-bold text-slate-800">UPI / QR Code</p>
                              <p className="text-[10px] text-slate-500 font-light mt-0.5">Scan & Pay on delivery</p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <button
                        type="button"
                        onClick={handleCloseCheckout}
                        className="px-6 py-3 border border-slate-250 rounded-xl text-xs font-semibold text-slate-655 hover:bg-slate-50 transition-colors w-1/3"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={cartCount === 0}
                        className="px-8 py-3 bg-grocella-700 text-white rounded-xl text-xs font-bold hover:bg-grocella-800 transition-all flex items-center justify-center gap-2 w-2/3 shadow-md shadow-grocella-700/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Place COD Order
                      </button>
                    </div>
                  </form>

                  {/* Summary column */}
                  <div className="md:col-span-2 bg-slate-50 p-8 sm:p-10 border-l border-slate-100 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-serif font-black text-slate-900 border-b border-slate-200 pb-4">
                        Order Summary
                      </h3>

                      {cart.length === 0 ? (
                        <p className="text-slate-500 text-xs py-8 text-center font-light">Your cart is empty.</p>
                      ) : (
                        <div className="divide-y divide-slate-150 max-h-[300px] overflow-y-auto pr-2 mt-4">
                          {cart.map((item) => (
                            <div key={item.id} className="py-3 flex justify-between gap-3 text-xs">
                              <div>
                                <p className="font-bold text-slate-800">{item.name}</p>
                                <p className="text-slate-555 text-[10px] mt-0.5">
                                  Qty: {item.quantity} &times; ₹{item.price}
                                </p>
                              </div>
                              <span className="font-semibold text-slate-850">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="border-t border-slate-200 pt-5 mt-6">
                      <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between text-slate-600">
                          <span>Subtotal</span>
                          <span className="font-medium">₹{cartTotal}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>GST (5%)</span>
                          <span className="font-medium">₹{gstFee}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Delivery Fee</span>
                          <span className="font-medium">
                            {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${deliveryFee}`}
                          </span>
                        </div>
                        <div className="border-t border-slate-205 my-3"></div>
                        <div className="flex justify-between text-slate-900 font-serif font-black text-base">
                          <span>Total Amount</span>
                          <span>₹{finalTotal}</span>
                        </div>
                      </div>

                      {deliveryFee > 0 && (
                        <div className="mt-4 p-3 bg-grocella-50 border border-grocella-100 rounded-xl text-[10px] text-grocella-800 flex items-center gap-2">
                          <Truck className="w-4 h-4 flex-shrink-0" />
                          <span>Add ₹{500 - cartTotal} more for <strong>FREE Delivery</strong></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Success Screen */
                <div className="p-10 sm:p-14 text-center max-w-xl mx-auto">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-serif font-black text-slate-900">Order Placed!</h2>
                  <p className="text-slate-605 text-sm mt-3 font-light">
                    Thank you, <strong>{formData.name}</strong>. Your order has been registered and is being processed for delivery.
                  </p>

                  <div className="my-8 p-6 bg-slate-50 rounded-2xl border border-slate-150 text-left space-y-4">
                    <div className="flex justify-between text-xs border-b border-slate-200/60 pb-3">
                      <span className="text-slate-500">Order Reference</span>
                      <strong className="text-slate-900 font-mono text-sm">{orderId}</strong>
                    </div>
                    <div className="flex justify-between text-xs border-b border-slate-200/60 pb-3">
                      <span className="text-slate-500">Estimated Delivery</span>
                      <strong className="text-slate-900 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-grocella-700" />
                        In 2 - 4 Days (by Road Cargo)
                      </strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Shipping Location</span>
                      <strong className="text-slate-900 text-right line-clamp-1 max-w-[200px]">
                        {formData.city}, {formData.state}
                      </strong>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
                    <button
                      onClick={handleCloseCheckout}
                      className="px-6 py-3 border border-slate-250 text-slate-655 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                    >
                      Continue Shopping
                    </button>
                    <button
                      onClick={() => alert("Simulating receipt download...")}
                      className="px-8 py-3 bg-grocella-900 text-white rounded-xl text-xs font-bold hover:bg-grocella-800 shadow-md flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Download Receipt
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default function RetailStore() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-55">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-grocella-700 mx-auto"></div>
          <p className="text-xs text-slate-500 mt-3 font-semibold">Loading Grocella Retail Store...</p>
        </div>
      </div>
    }>
      <RetailStoreContent />
    </Suspense>
  );
}
