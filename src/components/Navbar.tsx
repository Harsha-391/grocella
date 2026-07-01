"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, ShoppingBag, Menu, X, Building2, ShoppingCart, ArrowRight, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { cart, cartCount, cartTotal, updateQuantity, removeFromCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawers when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
    setCartDrawerOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const getLinkHref = (hash: string) => {
    return isHome ? hash : `/${hash}`;
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "shadow-lg bg-white/95 backdrop-blur-md border-b border-slate-100 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105 ${
                scrolled ? "bg-grocella-700 shadow-grocella-700/25" : "bg-white shadow-white/10"
              }`}>
                <Leaf className={`${scrolled ? "text-white" : "text-grocella-700"} w-5.5 h-5.5`} />
              </div>
              <div className="flex flex-col">
                <span className={`font-serif font-black text-2xl leading-none tracking-tight transition-colors ${
                  scrolled ? "text-grocella-900" : "text-white"
                }`}>
                  GROCELLA
                </span>
                <span className={`text-[9px] font-bold tracking-widest uppercase mt-0.5 transition-colors ${
                  scrolled ? "text-slate-500" : "text-emerald-100/90"
                }`}>
                  Foods (OPC) Pvt Ltd
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={`font-semibold transition-colors ${
                  pathname === "/"
                    ? scrolled ? "text-grocella-700" : "text-white font-bold"
                    : scrolled ? "text-slate-650 hover:text-grocella-750" : "text-white/80 hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link
                href={getLinkHref("#about")}
                className={`font-semibold transition-colors ${
                  scrolled ? "text-slate-650 hover:text-grocella-700" : "text-white/80 hover:text-white"
                }`}
              >
                Corporate
              </Link>
              <Link
                href={getLinkHref("#channels")}
                className={`font-semibold transition-colors ${
                  scrolled ? "text-slate-650 hover:text-grocella-700" : "text-white/80 hover:text-white"
                }`}
              >
                Divisions
              </Link>
              <Link
                href={getLinkHref("#products")}
                className={`font-semibold transition-colors ${
                  scrolled ? "text-slate-650 hover:text-grocella-700" : "text-white/80 hover:text-white"
                }`}
              >
                Products
              </Link>

              <div className={`h-6 w-px transition-colors ${scrolled ? "bg-slate-350" : "bg-white/20"}`}></div>

              {/* Shopping Bag CTA */}
              <button
                onClick={() => setCartDrawerOpen(true)}
                className={`relative group flex items-center gap-2 font-bold transition-colors ${
                  scrolled ? "text-grocella-700 hover:text-grocella-800" : "text-white hover:text-emerald-100"
                }`}
              >
                <div className="relative">
                  <ShoppingBag className="w-5.5 h-5.5 group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-grocella-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </div>
                Retail Cart
              </button>

              <Link
                href="/retail"
                className={`font-bold flex items-center gap-1.5 transition-colors ${
                  scrolled ? "text-slate-650 hover:text-grocella-750" : "text-white hover:text-emerald-100"
                }`}
              >
                Retail Store
              </Link>

              {/* B2B Portal Button */}
              <Link
                href="/b2b"
                className={`px-5 py-2.5 rounded-full font-semibold hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg flex items-center gap-2 text-sm ${
                  scrolled
                    ? "bg-grocella-900 text-white hover:bg-grocella-800"
                    : "bg-white text-grocella-900 hover:bg-emerald-50"
                }`}
              >
                <Building2 className="w-4 h-4" /> B2B Portal
              </Link>
            </div>

            {/* Mobile menu button and cart */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setCartDrawerOpen(true)}
                className={`relative p-2 transition-colors ${
                  scrolled ? "text-slate-650 hover:text-grocella-700" : "text-white hover:text-emerald-100"
                }`}
              >
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-grocella-accent text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`focus:outline-none p-2 transition-colors ${
                  scrolled ? "text-slate-650 hover:text-grocella-700" : "text-white hover:text-emerald-100"
                }`}
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-2xl animate-in fade-in slide-in-from-top-4 duration-250">
            <div className="px-4 pt-2 pb-6 space-y-1.5">
              <Link
                href="/"
                className="block px-3 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-grocella-700 rounded-md"
              >
                Home
              </Link>
              <Link
                href={getLinkHref("#about")}
                className="block px-3 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-grocella-700 rounded-md"
              >
                Corporate
              </Link>
              <Link
                href={getLinkHref("#channels")}
                className="block px-3 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-grocella-700 rounded-md"
              >
                Divisions
              </Link>
              <Link
                href={getLinkHref("#products")}
                className="block px-3 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-grocella-700 rounded-md"
              >
                Products
              </Link>
              <div className="border-t border-slate-100 my-2"></div>
              <Link
                href="/retail"
                className="block px-3 py-3 text-base font-bold text-grocella-700 bg-grocella-50 rounded-md flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" /> Shop Retail (B2C)
              </Link>
              <Link
                href="/b2b"
                className="block px-3 py-3 mt-2 text-base font-semibold text-white bg-grocella-900 rounded-md flex items-center gap-2"
              >
                <Building2 className="w-5 h-5" /> Wholesale Portal (B2B)
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Global Shopping Cart Slide-over Drawer */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-100 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            {/* Overlay */}
            <div
              onClick={() => setCartDrawerOpen(false)}
              className="absolute inset-0 bg-slate-900/60 transition-opacity backdrop-blur-xs"
            ></div>

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md animate-in slide-in-from-right duration-300">
                <div className="flex h-full flex-col bg-white shadow-2xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between border-b border-slate-100 pb-5">
                      <h2 className="text-xl font-serif font-black text-slate-900 flex items-center gap-2" id="slide-over-title">
                        <ShoppingCart className="text-grocella-700 w-5 h-5" /> Retail Cart ({cartCount})
                      </h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setCartDrawerOpen(false)}
                          className="relative -m-2 p-2 text-slate-400 hover:text-slate-550"
                        >
                          <span className="absolute -inset-0.5"></span>
                          <span className="sr-only">Close panel</span>
                          <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      {cart.length === 0 ? (
                        <div className="text-center py-20">
                          <ShoppingBag className="w-16 h-16 text-slate-305 mx-auto mb-4" />
                          <h3 className="text-lg font-bold text-slate-800">Your cart is empty</h3>
                          <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto">
                            Fill it with Rajasthan's finest organic cereals, grains, and spices.
                          </p>
                          <Link
                            href="/retail"
                            onClick={() => setCartDrawerOpen(false)}
                            className="inline-flex items-center gap-2 mt-6 bg-grocella-700 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-grocella-800 transition-colors"
                          >
                            Explore Store <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      ) : (
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-slate-100">
                            {cart.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-slate-100">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-bold text-slate-900">
                                      <h3 className="line-clamp-1">{item.name}</h3>
                                      <p className="ml-4 font-serif">₹{item.price * item.quantity}</p>
                                    </div>
                                    <p className="mt-1 text-xs text-slate-450 uppercase tracking-wider">{item.category}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex items-center border border-slate-205 rounded-lg bg-slate-50 overflow-hidden">
                                      <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="px-2 py-1 hover:bg-slate-200 transition-colors"
                                      >
                                        <Minus className="w-3.5 h-3.5" />
                                      </button>
                                      <span className="px-3 font-semibold text-slate-800">{item.quantity}</span>
                                      <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="px-2 py-1 hover:bg-slate-200 transition-colors"
                                      >
                                        <Plus className="w-3.5 h-3.5" />
                                      </button>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => removeFromCart(item.id)}
                                      className="font-medium text-red-500 hover:text-red-700 flex items-center gap-1 text-xs"
                                    >
                                      <Trash2 className="w-4 h-4" /> Remove
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {cart.length > 0 && (
                    <div className="border-t border-slate-100 px-4 py-6 sm:px-6 bg-slate-50">
                      <div className="flex justify-between text-base font-bold text-slate-900">
                        <p>Subtotal</p>
                        <p className="font-serif text-xl">₹{cartTotal}</p>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">Shipping, GST, and discounts calculated at checkout.</p>
                      <div className="mt-6">
                        <Link
                          href="/retail?checkout=true"
                          onClick={() => setCartDrawerOpen(false)}
                          className="flex items-center justify-center rounded-xl border border-transparent bg-grocella-700 px-6 py-3.5 text-base font-bold text-white shadow-md hover:bg-grocella-800 transition-colors gap-2"
                        >
                          Checkout Now
                        </Link>
                      </div>
                      <div className="mt-4 flex justify-center text-center text-sm text-slate-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-bold text-grocella-700 hover:text-grocella-800"
                            onClick={() => setCartDrawerOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
