"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  FileText,
  Percent,
  CheckCircle,
  Truck,
  Plus,
  Minus,
  Sparkles,
  Download,
  ShieldCheck,
  Layers,
  ArrowRight,
  Info,
  ChevronRight,
  Database,
  Loader2,
  Globe,
  X
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface WholesaleProduct {
  sku: string;
  name: string;
  unit: string;
  price: number;
  category: string;
}

// Convert Retail Product to B2B Wholesale Product dynamically
const getWholesaleDetails = (product: any): WholesaleProduct => {
  const unit = product.unit.toLowerCase();
  let multiplier = 10;
  let wholesaleUnit = "10 kg Carton";

  if (unit.includes("50g") || unit.includes("100g") || unit.includes("100 g") || unit.includes("50 g")) {
    multiplier = 50; // 50 * 100g = 5kg
    wholesaleUnit = "5 kg Tin";
  } else if (unit.includes("500g") || unit.includes("500 g")) {
    multiplier = 20; // 20 * 500g = 10kg
    wholesaleUnit = "10 kg Carton";
  } else if (unit.includes("1 kg") || unit.includes("1kg") || unit.includes("kg")) {
    multiplier = 50; // 50 * 1kg = 50kg
    wholesaleUnit = "50 kg Bag";
  } else if (unit.includes("1 l") || unit.includes("1l") || unit.includes("litre")) {
    multiplier = 15; // 15 * 1L = 15L/15kg
    wholesaleUnit = "15 kg Tin";
  } else if (unit.includes("bag") || unit.includes("carton") || unit.includes("tin") || unit.includes("jar")) {
    multiplier = 1;
    wholesaleUnit = product.unit;
  }

  // Wholesale price is retail price * multiplier discounted by 25% for bulk purchase
  const wholesalePrice = Math.round(product.price * multiplier * 0.75);

  return {
    sku: product.sku,
    name: product.name,
    unit: wholesaleUnit,
    price: wholesalePrice,
    category: product.category
  };
};

export default function B2BPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    gstin: "",
    company: "",
    password: ""
  });

  // Database Products state
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [dbLoading, setDbLoading] = useState(true);

  // Bulk Quantities State: Maps sku to quantities
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const [inquiryType, setInquiryType] = useState("franchise"); // franchise or export
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    state: "Rajasthan",
    message: ""
  });
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Proforma Invoice state
  const [proformaOpen, setProformaOpen] = useState(false);
  const [proformaId, setProformaId] = useState("");
  const [orderFinalized, setOrderFinalized] = useState(false);

  // Fetch products from MongoDB
  const fetchProducts = async () => {
    setDbLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setDbProducts(data.data);
        // Initialize quantities to 0 for all product SKUs
        const initialQtys: Record<string, number> = {};
        data.data.forEach((p: any) => {
          initialQtys[p.sku] = 0;
        });
        setQuantities(initialQtys);
      }
    } catch (e) {
      console.error("Failed to fetch database products for B2B portal:", e);
    } finally {
      setDbLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Map to wholesale format
  const wholesaleProducts = dbProducts.map(getWholesaleDetails);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.gstin.length < 15) {
      alert("Please enter a valid 15-character Indian GSTIN number.");
      return;
    }
    setIsAuthenticated(true);
  };

  const handleQtyChange = (sku: string, val: number) => {
    const safeVal = Math.max(0, val);
    setQuantities((prev) => ({
      ...prev,
      [sku]: safeVal
    }));
  };

  const increment = (sku: string) => {
    setQuantities((prev) => ({
      ...prev,
      [sku]: (prev[sku] || 0) + 1
    }));
  };

  const decrement = (sku: string) => {
    setQuantities((prev) => ({
      ...prev,
      [sku]: Math.max(0, (prev[sku] || 0) - 1)
    }));
  };

  // Computations
  const subtotal = wholesaleProducts.reduce((sum, product) => {
    const qty = quantities[product.sku] || 0;
    return sum + product.price * qty;
  }, 0);

  // Wholesale Discount Tiers:
  // - >= 50,000 -> 15% discount
  // - >= 30,000 -> 10% discount
  // - >= 15,000 -> 5% discount
  let discountRate = 0;
  if (subtotal >= 50000) discountRate = 0.15;
  else if (subtotal >= 30000) discountRate = 0.1;
  else if (subtotal >= 15000) discountRate = 0.05;

  const discountAmount = Math.round(subtotal * discountRate);
  const totalAfterDiscount = subtotal - discountAmount;
  const gstAmount = Math.round(totalAfterDiscount * 0.05); // 5% bulk GST on agricultural foods
  const finalTotal = totalAfterDiscount + gstAmount;

  // Wholesale Limits
  const minOrderLimit = 10000;
  const meetsMinLimit = subtotal >= minOrderLimit;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySuccess(true);
    setInquiryForm({
      name: "",
      company: "",
      phone: "",
      email: "",
      state: "Rajasthan",
      message: ""
    });
    setTimeout(() => setInquirySuccess(false), 5000);
  };

  const handlePlaceOrder = () => {
    if (!meetsMinLimit) return;
    const randomId = "GP-B2B-" + Math.floor(10000 + Math.random() * 90000);
    setProformaId(randomId);
    setProformaOpen(true);
    setOrderFinalized(false);
  };

  const handleFinalizeProforma = () => {
    setOrderFinalized(true);
    // Clear quantities
    const resetQtys: Record<string, number> = {};
    wholesaleProducts.forEach((p) => {
      resetQtys[p.sku] = 0;
    });
    setQuantities(resetQtys);
  };

  const handleCloseProforma = () => {
    setProformaOpen(false);
    setOrderFinalized(false);
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
              Wholesale & Distributor Portal (B2B)
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-black mt-3">Grocella B2B Hub</h1>
            <p className="text-grocella-100 text-sm mt-2 max-w-2xl font-light">
              Access wholesale bulk listings, live inventory sheets, commercial discount structures, and direct franchise and shipping inquiry channels.
            </p>
          </div>
        </section>

        {!isAuthenticated ? (
          /* B2B Auth Form */
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-150 shadow-xl overflow-hidden">
              <div className="bg-slate-50 p-6.5 border-b border-slate-100 text-center">
                <Building2 className="w-10 h-10 text-grocella-700 mx-auto mb-2" />
                <h2 className="text-xl font-serif font-black text-slate-900">Wholesale Login</h2>
                <p className="text-xs text-slate-550 font-light mt-0.5">
                  Access pricing catalog with valid business credentials.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="p-8 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-650 mb-1">Company Registered Name</label>
                  <input
                    type="text"
                    required
                    value={loginData.company}
                    onChange={(e) => setLoginData({ ...loginData, company: e.target.value })}
                    placeholder="e.g. Rajasthan Agrifoods Ltd"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-grocella-700 focus:border-transparent bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 mb-1">Business Email Address</label>
                  <input
                    type="email"
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="sourcing@company.com"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-grocella-700 focus:border-transparent bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 mb-1">Company GSTIN Number (15 digits)</label>
                  <input
                    type="text"
                    required
                    maxLength={15}
                    value={loginData.gstin}
                    onChange={(e) => setLoginData({ ...loginData, gstin: e.target.value.toUpperCase() })}
                    placeholder="08AAAAA0000A1Z1"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-grocella-700 focus:border-transparent bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-655 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-grocella-700 focus:border-transparent bg-slate-50"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-grocella-900 text-white py-3 rounded-xl text-xs font-bold hover:bg-grocella-800 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                  >
                    Enter B2B Dashboard <ArrowRight className="w-4.5 h-4.5" />
                  </button>
                </div>
              </form>

              <div className="bg-slate-50 px-8 py-4.5 border-t border-slate-100 text-center">
                <p className="text-[10px] text-slate-500 leading-relaxed font-light">
                  Registration is subject to verification of the FSSAI license and GSTIN details as required under Rajasthani trade regulations.
                </p>
              </div>
            </div>
          </section>
        ) : (
          /* B2B Dashboard Section */
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Dashboard Welcome header */}
            <div className="bg-white border border-slate-150 rounded-3xl p-6.5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
              <div>
                <span className="text-[10px] bg-emerald-105 text-emerald-850 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                  Verified Wholesaler
                </span>
                <h2 className="text-xl font-bold text-slate-905 mt-2 font-serif">
                  Welcome Back, {loginData.company || "Corporate Partner"}
                </h2>
                <p className="text-xs text-slate-550 font-light mt-0.5">
                  GSTIN: <span className="font-mono font-semibold">{loginData.gstin}</span> | Location: Rajasthan (Central Hub)
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="px-4 py-2.5 border border-slate-250 text-slate-650 hover:bg-slate-50 rounded-xl text-xs font-semibold"
                >
                  Logout B2B
                </button>
                <button
                  onClick={() => alert("Downloading pricing sheet PDF...")}
                  className="px-4 py-2.5 bg-grocella-900 hover:bg-grocella-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-4 h-4" /> Export Price Sheet
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column: Quick Bulk Order Sheet */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white border border-slate-155 rounded-3xl shadow-xs overflow-hidden">
                  <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                    <h3 className="font-serif font-black text-slate-900 text-lg flex items-center gap-2">
                      <Layers className="text-grocella-700 w-5.5 h-5.5" /> Bulk Quick-Order Sheet
                    </h3>
                    <span className="text-xs text-slate-500 font-light">Enter bulk quantities directly</span>
                  </div>

                  {dbLoading ? (
                    <div className="py-20 text-center text-slate-500">
                      <Loader2 className="w-10 h-10 animate-spin mx-auto text-grocella-700 mb-3" />
                      <p className="text-xs font-semibold">Connecting to MongoDB database...</p>
                    </div>
                  ) : wholesaleProducts.length === 0 ? (
                    <div className="py-20 text-center text-slate-450 p-8">
                      <Database className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <h4 className="font-bold text-sm text-slate-800">No wholesale products available</h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto font-light leading-relaxed">
                        Go to the admin panel dashboard to seed initial agricultural items or upload new products.
                      </p>
                      <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 mt-6 bg-grocella-700 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-grocella-800 transition-colors shadow-sm"
                      >
                        Go to Admin Panel
                      </Link>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-650 font-bold border-b border-slate-200">
                            <th className="p-4">SKU</th>
                            <th className="p-4">Product Name</th>
                            <th className="p-4">Unit Size</th>
                            <th className="p-4">Wholesale Rate</th>
                            <th className="p-4 text-center w-36">Quantity</th>
                            <th className="p-4 text-right">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {wholesaleProducts.map((product) => {
                            const qty = quantities[product.sku] || 0;
                            return (
                              <tr key={product.sku} className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-4 font-mono font-semibold text-slate-500 text-[10px]">{product.sku}</td>
                                <td className="p-4">
                                  <p className="font-bold text-slate-800">{product.name}</p>
                                  <span className="text-[10px] text-slate-450 uppercase tracking-wider">{product.category}</span>
                                </td>
                                <td className="p-4 text-slate-606 font-semibold">{product.unit}</td>
                                <td className="p-4 font-bold text-slate-800">₹{product.price}</td>
                                <td className="p-4">
                                  <div className="flex items-center border border-slate-250 rounded-lg bg-slate-55 overflow-hidden mx-auto max-w-[120px]">
                                    <button
                                      onClick={() => decrement(product.sku)}
                                      className="px-2 py-1.5 hover:bg-slate-200 transition-colors text-slate-500"
                                    >
                                      <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <input
                                      type="number"
                                      min="0"
                                      value={qty}
                                      onChange={(e) => handleQtyChange(product.sku, parseInt(e.target.value) || 0)}
                                      className="w-full text-center bg-transparent font-bold text-slate-800 outline-none text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <button
                                      onClick={() => increment(product.sku)}
                                      className="px-2 py-1.5 hover:bg-slate-200 transition-colors text-slate-500"
                                    >
                                      <Plus className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                                <td className="p-4 text-right font-serif font-bold text-slate-905">
                                  ₹{product.price * qty}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Info panels */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border border-slate-150 rounded-3xl p-6.5 flex gap-4">
                    <div className="w-12 h-12 bg-amber-100 text-amber-705 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Franchise Opportunities</h4>
                      <p className="text-slate-550 text-xs mt-1.5 leading-relaxed font-light">
                        We offer exclusive dealership mandates, territorial distributorship licenses, and franchise outlets across India. Check our terms.
                      </p>
                      <a href="#inquiry" onClick={() => setInquiryType("franchise")} className="inline-flex items-center gap-1.5 text-grocella-700 font-bold text-xs mt-3.5 hover:text-grocella-800">
                        Inquire Dealership <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-150 rounded-3xl p-6.5 flex gap-4">
                    <div className="w-12 h-12 bg-emerald-105 text-emerald-805 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Global Export Support</h4>
                      <p className="text-slate-555 text-xs mt-1.5 leading-relaxed font-light">
                        Full compliance exports to UAE, USA, and UK. We handle Phytosanitary inspections, custom packaging, clearance at ICD ports, and sea freight logistics.
                      </p>
                      <a href="#inquiry" onClick={() => setInquiryType("export")} className="inline-flex items-center gap-1.5 text-grocella-700 font-bold text-xs mt-3.5 hover:text-grocella-800">
                        Request Export Quote <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Pricing Tiers & Summary */}
              <div className="space-y-8">
                {/* Discount Tiers */}
                <div className="bg-white border border-slate-150 rounded-3xl p-6.5 shadow-xs">
                  <h3 className="font-serif font-black text-slate-900 text-base mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Percent className="text-grocella-700 w-5 h-5" /> Bulk Discount Tiers
                  </h3>
                  <div className="space-y-3.5 text-xs">
                    <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                      discountRate === 0.05 ? "border-grocella-700 bg-grocella-50/55" : "border-slate-155 bg-slate-50/50"
                    }`}>
                      <div>
                        <p className="font-bold text-slate-800">Tier 1: 5% Discount</p>
                        <p className="text-[10px] text-slate-500 font-light mt-0.5">For orders above ₹15,000</p>
                      </div>
                      <span className="font-bold text-grocella-700">₹15k+</span>
                    </div>

                    <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                      discountRate === 0.10 ? "border-grocella-700 bg-grocella-50/55" : "border-slate-155 bg-slate-50/50"
                    }`}>
                      <div>
                        <p className="font-bold text-slate-800">Tier 2: 10% Discount</p>
                        <p className="text-[10px] text-slate-500 font-light mt-0.5">For orders above ₹30,000</p>
                      </div>
                      <span className="font-bold text-grocella-700">₹30k+</span>
                    </div>

                    <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                      discountRate === 0.15 ? "border-grocella-700 bg-grocella-50/55" : "border-slate-155 bg-slate-50/50"
                    }`}>
                      <div>
                        <p className="font-bold text-slate-800">Tier 3: 15% Discount</p>
                        <p className="text-[10px] text-slate-500 font-light mt-0.5">For orders above ₹50,000</p>
                      </div>
                      <span className="font-bold text-grocella-700">₹50k+</span>
                    </div>
                  </div>
                </div>

                {/* Order Summary card */}
                <div className="bg-white border border-slate-150 rounded-3xl p-6.5 shadow-md flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-black text-slate-900 text-base mb-4 border-b border-slate-100 pb-3">
                      Wholesale Subtotal
                    </h3>

                    <div className="space-y-3.5 text-xs text-slate-650">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span className="font-bold text-slate-800">₹{subtotal}</span>
                      </div>
                      {discountRate > 0 && (
                        <div className="flex justify-between text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1.5 rounded-lg">
                          <span>Bulk Tier Discount ({discountRate * 100}%)</span>
                          <span>-₹{discountAmount}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Corporate IGST (5%)</span>
                        <span className="font-bold text-slate-800">₹{gstAmount}</span>
                      </div>
                      <div className="border-t border-slate-205 pt-3"></div>
                      <div className="flex justify-between text-slate-900 font-serif font-black text-lg">
                        <span>Proforma Total</span>
                        <span>₹{finalTotal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Limits and Checkouts */}
                  <div className="mt-8">
                    {!meetsMinLimit ? (
                      <div className="p-4 bg-amber-50 border border-amber-150 rounded-2xl text-xs text-amber-850 flex items-start gap-2.5 leading-relaxed font-light mb-4">
                        <Info className="w-5 h-5 flex-shrink-0 text-amber-700 mt-0.5" />
                        <div>
                          <strong>Minimum Order Limit Unmet:</strong> Wholesale orders require a minimum subtotal value of <strong>₹{minOrderLimit}</strong>. Add <strong>₹{minOrderLimit - subtotal}</strong> worth of bulk products.
                        </div>
                      </div>
                    ) : (
                      <div className="p-3.5 bg-emerald-50 border border-emerald-150 rounded-2xl text-[10px] text-emerald-800 flex items-center gap-2 font-bold mb-4">
                        <ShieldCheck className="w-5 h-5 text-emerald-700" />
                        Order meets wholesale guidelines. Ready for quotation.
                      </div>
                    )}

                    <button
                      onClick={handlePlaceOrder}
                      disabled={!meetsMinLimit}
                      className="w-full py-4.5 bg-grocella-700 text-white rounded-2xl text-xs font-bold hover:bg-grocella-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-grocella-700/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                    >
                      <FileText className="w-4.5 h-4.5" /> Generate Proforma Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Franchise / Export Inquiry Form Section */}
            <section id="inquiry" className="mt-16 bg-slate-50 border border-slate-150 rounded-[2.5rem] p-8 sm:p-12">
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <span className="text-[10px] text-grocella-700 font-bold uppercase tracking-wider">
                    Corporate Partnerships
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 mt-2">
                    Franchise & Custom Export Sourcing Inquiries
                  </h3>
                  <p className="text-slate-600 text-sm mt-4.5 leading-relaxed font-light">
                    Establish bulk packing arrangements, contract farming models, commission agency assignments, or domestic grocery retail franchises under the registered <strong>Grocella Foods</strong> mandate.
                  </p>
                  <p className="text-slate-550 text-xs mt-4.5 leading-relaxed font-light">
                    Our Rajasthan corporate office guarantees response to official business queries within 24 working hours.
                  </p>

                  <div className="flex gap-3.5 mt-8 border-b border-slate-200 pb-3">
                    <button
                      onClick={() => setInquiryType("franchise")}
                      className={`pb-2 text-sm font-bold transition-all relative ${
                        inquiryType === "franchise" ? "text-grocella-700 border-b-2 border-grocella-700" : "text-slate-550"
                      }`}
                    >
                      Franchise Inquiry
                    </button>
                    <button
                      onClick={() => setInquiryType("export")}
                      className={`pb-2 text-sm font-bold transition-all relative ${
                        inquiryType === "export" ? "text-grocella-700 border-b-2 border-grocella-700" : "text-slate-550"
                      }`}
                    >
                      Export Sourcing
                    </button>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleInquirySubmit} className="bg-white p-6 sm:p-8 border border-slate-155 rounded-3xl space-y-4">
                  {inquirySuccess && (
                    <div className="p-4 bg-emerald-50 border border-emerald-150 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      Inquiry received! Our Rajasthan partnership desk will contact you soon.
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-655 mb-1.5">Your Name</label>
                      <input
                        type="text"
                        required
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        placeholder="Rahul Sharma"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-grocella-700 focus:border-transparent bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-655 mb-1.5">Company Name</label>
                      <input
                        type="text"
                        required
                        value={inquiryForm.company}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, company: e.target.value })}
                        placeholder="Agrifood Enterprises"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-grocella-700 focus:border-transparent bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-655 mb-1.5">Contact Email</label>
                      <input
                        type="email"
                        required
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        placeholder="rahul@agrifood.com"
                        className="w-full px-4 py-2.5 border border-slate-205 rounded-xl text-xs outline-none focus:ring-2 focus:ring-grocella-700 focus:border-transparent bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-655 mb-1.5">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        required
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        placeholder="+91 98765 XXXXX"
                        className="w-full px-4 py-2.5 border border-slate-205 rounded-xl text-xs outline-none focus:ring-2 focus:ring-grocella-700 focus:border-transparent bg-slate-50"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-slate-655 mb-1.5">Operating State</label>
                      <select
                        value={inquiryForm.state}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, state: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-205 rounded-xl text-xs outline-none focus:ring-2 focus:ring-grocella-700 bg-slate-50 cursor-pointer"
                      >
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi / NCR</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Overseas">Outside India (Exports)</option>
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-slate-655 mb-1.5">Message / Requirements</label>
                      <textarea
                        required
                        rows={3}
                        value={inquiryForm.message}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                        placeholder={
                          inquiryType === "franchise"
                            ? "Please describe your retail store size and experience..."
                            : "Specify cargo shipping terms, ports, packing, and destination country..."
                        }
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-grocella-700 focus:border-transparent bg-slate-50 resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-grocella-900 text-white rounded-xl text-xs font-bold hover:bg-grocella-800 transition-colors shadow-sm active:scale-95"
                  >
                    Submit {inquiryType === "franchise" ? "Franchise" : "Export"} Inquiry
                  </button>
                </form>
              </div>
            </section>
          </section>
        )}
      </main>

      {/* Proforma Invoice Modal Overlay */}
      {proformaOpen && (
        <div className="fixed inset-0 z-150 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              onClick={handleCloseProforma}
              className="fixed inset-0 bg-slate-900/60 transition-opacity backdrop-blur-xs"
            ></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-middle bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-slate-100 p-8 sm:p-10">
              <div className="absolute right-6 top-6 z-10">
                <button
                  onClick={handleCloseProforma}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-550 rounded-full p-2.5 transition-colors focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!orderFinalized ? (
                /* Invoice preview */
                <div>
                  <div className="flex justify-between items-start border-b border-slate-200 pb-5">
                    <div>
                      <span className="text-[10px] text-grocella-700 font-bold uppercase tracking-wider">
                        Commercial Quotation
                      </span>
                      <h2 className="text-2xl font-serif font-black text-slate-905 mt-1">Proforma Invoice</h2>
                      <p className="text-[10px] text-slate-500 mt-1">Invoice ID: <span className="font-mono font-semibold">{proformaId}</span></p>
                    </div>

                    <div className="text-right text-[10px] text-slate-500 space-y-1">
                      <strong className="text-slate-905 block text-xs">GROCELLA FOODS (OPC) PVT LTD</strong>
                      <p>2nd Floor, S.N-B10, P.No-781, Arihant Plaza, Dadabari, Kota, Rajasthan 324009</p>
                      <p>FSSAI: 122XXXXXX00001</p>
                    </div>
                  </div>

                  <div className="my-6">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 text-[10px] grid grid-cols-2 gap-4">
                      <div>
                        <strong className="text-slate-550 block font-semibold">Billed To (Wholesaler):</strong>
                        <p className="text-slate-800 font-bold mt-1">{loginData.company}</p>
                        <p className="text-slate-606 mt-0.5">{loginData.email}</p>
                        <p className="text-slate-555 mt-1">GSTIN: <span className="font-mono">{loginData.gstin}</span></p>
                      </div>
                      <div>
                        <strong className="text-slate-555 block font-semibold">Shipping Mandate:</strong>
                        <p className="text-slate-800 mt-1">Road Transport (Consignment cargo)</p>
                        <p className="text-slate-606 mt-0.5">F.O.R Rajasthan Warehouse basis</p>
                        <p className="text-slate-555 mt-1">Loading Schedule: Within 48 Hours</p>
                      </div>
                    </div>

                    {/* Invoice items list */}
                    <div className="mt-6">
                      <p className="text-[10px] font-bold text-slate-700 mb-2 border-b border-slate-100 pb-1 uppercase tracking-wider">
                        Ordered Items
                      </p>
                      <div className="divide-y divide-slate-150 max-h-[200px] overflow-y-auto pr-2">
                        {wholesaleProducts.map((product) => {
                          const qty = quantities[product.sku] || 0;
                          if (qty <= 0) return null;
                          return (
                            <div key={product.sku} className="py-2.5 flex justify-between text-xs">
                              <div>
                                <p className="font-bold text-slate-800">{product.name}</p>
                                <p className="text-slate-555 text-[10px] mt-0.5">
                                  {qty} {qty > 1 ? "Bags/Cartons" : "Bag/Carton"} ({product.unit}) &times; ₹{product.price}
                                </p>
                              </div>
                              <span className="font-semibold text-slate-850">₹{product.price * qty}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-5 mt-6 grid grid-cols-2 items-end">
                    <div className="text-[10px] text-slate-500 space-y-1">
                      <p>&bull; Prices include sorting & packaging at Rajasthan plant.</p>
                      <p>&bull; Freight charges to be paid to the carrier on F.O.R destination basis.</p>
                      <p>&bull; Quotation valid for 15 calendar days from issue.</p>
                    </div>

                    <div className="space-y-2.5 text-xs text-slate-655 ml-auto w-64">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span>₹{subtotal}</span>
                      </div>
                      {discountRate > 0 && (
                        <div className="flex justify-between text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                          <span>Bulk Discount ({discountRate * 100}%)</span>
                          <span>-₹{discountAmount}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>GST / IGST (5%)</span>
                        <span>₹{gstAmount}</span>
                      </div>
                      <div className="border-t border-slate-205 my-2"></div>
                      <div className="flex justify-between text-slate-900 font-serif font-black text-base">
                        <span>Total Due</span>
                        <span>₹{finalTotal}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <button
                      type="button"
                      onClick={handleCloseProforma}
                      className="px-6 py-3 border border-slate-250 rounded-xl text-xs font-semibold text-slate-655 hover:bg-slate-50 transition-colors w-1/3"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={handleFinalizeProforma}
                      className="px-8 py-3 bg-grocella-700 text-white rounded-xl text-xs font-bold hover:bg-grocella-800 transition-all flex items-center justify-center gap-2 w-2/3 shadow-md shadow-grocella-700/20 active:scale-95"
                    >
                      Confirm Bulk Order Request
                    </button>
                  </div>
                </div>
              ) : (
                /* Invoice Success Confirmed */
                <div className="text-center py-10 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-serif font-black text-slate-900">Request Sent!</h2>
                  <p className="text-slate-605 text-sm mt-3 font-light leading-relaxed">
                    Corporate quote request <strong>{proformaId}</strong> has been registered. An official commercial invoice with bank bank details will be shared on <strong>{loginData.email}</strong> after trade officer verification.
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3.5 justify-center">
                    <button
                      onClick={handleCloseProforma}
                      className="px-6 py-3 border border-slate-250 text-slate-655 hover:bg-slate-50 rounded-xl text-xs font-semibold w-full"
                    >
                      Back to Dashboard
                    </button>
                    <button
                      onClick={() => alert("Downloading proforma receipt...")}
                      className="px-8 py-3 bg-grocella-900 text-white rounded-xl text-xs font-bold hover:bg-grocella-805 shadow-md flex items-center justify-center gap-1.5 w-full whitespace-nowrap"
                    >
                      <Download className="w-4 h-4" /> Download Proforma
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
