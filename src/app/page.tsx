"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  ShoppingCart,
  Handshake,
  Store,
  Truck,
  Factory,
  ArrowRight,
  Award,
  Globe,
  Package,
  Scale,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden bg-grocella-900 text-white">
        {/* Background Gradients and blobs */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0 bg-gradient-to-br from-grocella-800 via-grocella-900 to-black"></div>
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-grocella-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
          <div className="absolute -left-20 bottom-10 w-72 h-72 bg-grocella-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Hero Text */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-grocella-100 text-sm font-semibold mb-6 backdrop-blur-md">
                <MapPin className="w-4 h-4 text-grocella-accent fill-grocella-accent" />
                Based in Rajasthan, Serving Globally
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                From Farm to <span className="text-grocella-300 italic font-medium">Future.</span>
              </h1>
              <p className="text-lg text-grocella-100 mb-8 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                Manufacturers, processors, and global distributors of premium grocery products. Whether you are a household looking for purity, or a franchise needing scale—we deliver excellence at every step of the supply chain.
              </p>

              {/* Dual CTA */}
              <div className="flex flex-col sm:flex-row gap-4.5 justify-center lg:justify-start">
                <Link
                  href="/retail"
                  className="px-8 py-4 bg-white text-grocella-900 rounded-xl font-bold hover:bg-slate-100 hover:-translate-y-0.5 transition-all shadow-xl shadow-grocella-950/30 flex items-center justify-center gap-2 group"
                >
                  <ShoppingCart className="w-5 h-5 text-grocella-700 group-hover:-translate-y-0.5 transition-transform" />
                  Shop Consumer Store
                </Link>
                <Link
                  href="/b2b"
                  className="px-8 py-4 bg-transparent border-2 border-grocella-400 text-white rounded-xl font-bold hover:bg-grocella-400/10 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
                >
                  <Handshake className="w-5 h-5 text-grocella-300 group-hover:scale-105 transition-transform" />
                  B2B Partner Portal
                </Link>
              </div>
            </motion.div>

            {/* Hero Imagery Grid */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4.5 z-10"
            >
              <div className="space-y-4.5 translate-y-8">
                <div className="overflow-hidden rounded-2xl shadow-2xl border border-white/10 group aspect-[4/5]">
                  <img
                    src="/images/harvesting.png"
                    alt="Agriculture in Rajasthan"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-2xl border border-white/10 group aspect-[4/3]">
                  <img
                    src="/images/spices.png"
                    alt="Premium Indian Spices"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4.5">
                <div className="overflow-hidden rounded-2xl shadow-2xl border border-white/10 group aspect-[4/3]">
                  <img
                    src="/images/facility.png"
                    alt="Modern Food Processing Facility"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-2xl border border-white/10 group aspect-[4/5]">
                  <img
                    src="/images/packaging.png"
                    alt="Eco-friendly Food Packaged Goods"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Channels Section */}
      <section id="channels" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              One Company. <span className="text-grocella-700">Three Channels.</span>
            </h2>
            <p className="text-slate-650 text-lg leading-relaxed">
              Our robust infrastructure allows us to serve the entire food ecosystem, from raw agricultural produce to ready-to-eat consumer packaged goods.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Channel 1: B2C */}
            <motion.div
              variants={itemVariants}
              className="card-hover-effect bg-slate-50 rounded-3xl p-8 border border-slate-105 flex flex-col h-full"
            >
              <div className="w-14 h-14 bg-grocella-100 text-grocella-700 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <Store className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">Direct to Consumer</h3>
              <p className="text-slate-600 mb-6 flex-grow leading-relaxed">
                Experience the purity of Grocella Foods delivered directly to your doorstep. Shop our retail line of organic foods, spices, dry fruits, and daily dairy.
              </p>
              <Link
                href="/retail"
                className="text-grocella-700 font-bold flex items-center gap-2 hover:text-grocella-800 transition-colors mt-auto group"
              >
                Enter Retail Store <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Channel 2: B2B */}
            <motion.div
              variants={itemVariants}
              className="card-hover-effect bg-grocella-900 rounded-3xl p-8 border border-grocella-850 flex flex-col h-full shadow-xl shadow-grocella-950/10 relative overflow-hidden text-white"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-grocella-600 rounded-full filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>

              <div className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6 border border-white/20 backdrop-blur-sm relative z-10">
                <Truck className="w-7 h-7 text-grocella-300" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3 relative z-10">Wholesale & Distribution</h3>
              <p className="text-grocella-100 mb-6 flex-grow relative z-10 font-light leading-relaxed">
                Dedicated portal for retailers, distributors, stockists, and franchisees. Access bulk pricing, real-time inventory, and secure large-scale consignments.
              </p>
              <Link
                href="/b2b"
                className="text-white font-bold flex items-center gap-2 hover:text-grocella-200 transition-colors mt-auto group relative z-10"
              >
                Access Partner Portal <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Channel 3: Corporate */}
            <motion.div
              variants={itemVariants}
              className="card-hover-effect bg-slate-50 rounded-3xl p-8 border border-slate-105 flex flex-col h-full"
            >
              <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <Factory className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">Manufacturing & Export</h3>
              <p className="text-slate-600 mb-6 flex-grow leading-relaxed">
                Discover our state-of-the-art processing, packing, and refining capabilities. We act as commission agents and global exporters of agricultural produce.
              </p>
              <a
                href="#about"
                className="text-amber-700 font-bold flex items-center gap-2 hover:text-amber-800 transition-colors mt-auto group"
              >
                Corporate Overview <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Products Portfolio Section */}
      <section id="products" className="py-24 pattern-bg border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our Extensive Portfolio
              </h2>
              <p className="text-slate-655 leading-relaxed">
                From raw agricultural produce to processed ready-to-eat foods, we deal in an exhaustive range of high-quality food products.
              </p>
            </div>
            <Link
              href="/retail"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-grocella-700 text-grocella-700 font-bold rounded-full hover:bg-grocella-700 hover:text-white transition-all whitespace-nowrap gap-1.5"
            >
              Browse Full Catalog <ChevronRight className="w-4.5 h-4.5" />
            </Link>
          </div>

          {/* Asymmetrical Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 auto-rows-[250px]">
            {/* Large Feature Item: Grains */}
            <Link
              href="/retail?category=grains"
              className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group shadow-md"
            >
              <img
                src="/images/harvesting.png"
                alt="Cereals, Pulses & Grains"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="bg-grocella-600 text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3.5">
                  Core Commodity
                </div>
                <h3 className="text-3xl font-serif font-black text-white mb-2.5">
                  Cereals, Pulses & Grains
                </h3>
                <p className="text-slate-200 max-w-md hidden md:block text-sm font-light leading-relaxed">
                  Sourced directly from the finest farms, encompassing rice, wheat, flour, and essential daily grains.
                </p>
              </div>
            </Link>

            {/* Spices */}
            <Link
              href="/retail?category=spices"
              className="relative rounded-3xl overflow-hidden group shadow-md"
            >
              <img
                src="/images/spices.png"
                alt="Spices"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-serif font-bold text-white mb-1.5">Spices & Herbs</h3>
                <p className="text-slate-250 text-xs font-light leading-relaxed">
                  Authentic Indian flavors, whole and ground spices.
                </p>
              </div>
            </Link>

            {/* Dairy & Beverages */}
            <Link
              href="/retail?category=beverages"
              className="relative rounded-3xl overflow-hidden group shadow-md"
            >
              {/* Fallback pattern with text since capacity was tight, using Unsplash dairy context */}
              <img
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Dairy & Beverages"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-serif font-bold text-white mb-1.5">Dairy & Beverages</h3>
                <p className="text-slate-250 text-xs font-light leading-relaxed">
                  Pure Rajasthani Ghee, milk products, tea, and premium coffee.
                </p>
              </div>
            </Link>

            {/* Organic & Health Foods */}
            <Link
              href="/retail?category=organic"
              className="md:col-span-2 relative rounded-3xl overflow-hidden group shadow-md"
            >
              <img
                src="/images/packaging.png"
                alt="Organic Foods"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6.5">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                  Organic & Health Foods
                </h3>
                <p className="text-slate-200 text-sm font-light max-w-lg leading-relaxed">
                  Certified organic produce, premium dry fruits, nutrient-dense nuts, and health-focused packaged grains.
                </p>
              </div>
            </Link>

            {/* Packaged */}
            <Link
              href="/retail?category=packaged"
              className="relative rounded-3xl overflow-hidden group shadow-md"
            >
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Frozen & Packaged"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-serif font-bold text-white mb-1.5">Frozen & Packaged</h3>
                <p className="text-slate-250 text-xs font-light leading-relaxed">
                  Semi-processed convenience, ready-to-cook delicacies, and snacks.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Corporate About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-grocella-50 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-12 items-center border border-grocella-100/50 shadow-xs">
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 text-grocella-700 font-bold tracking-wider uppercase text-sm">
                <ShieldCheck className="w-5.5 h-5.5" /> Corporate Integrity
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                Registered operations across the entire supply chain.
              </h2>
              <p className="text-slate-655 text-lg leading-relaxed font-light">
                Operating out of Rajasthan, <strong>Grocella Foods (OPC) Private Limited</strong> holds a comprehensive mandate to operate in India and globally.
              </p>
              <p className="text-slate-600 leading-relaxed font-light">
                We are legally structured and operationally equipped to act as manufacturers, refiners, packers, repackers, and traders. Our expansive network allows us to function seamlessly as buying & selling agents, consignors, and franchisors in the food and agricultural sectors.
              </p>

              <div className="pt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white shadow-xs border border-slate-100 flex items-center justify-center text-grocella-700 font-semibold">
                    <Award className="w-5.5 h-5.5" />
                  </div>
                  <span className="font-semibold text-slate-700 text-sm">FSSAI Certified</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white shadow-xs border border-slate-100 flex items-center justify-center text-grocella-700 font-semibold">
                    <Globe className="w-5.5 h-5.5" />
                  </div>
                  <span className="font-semibold text-slate-700 text-sm">Import/Export Ready</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white shadow-xs border border-slate-100 flex items-center justify-center text-grocella-700 font-semibold">
                    <Package className="w-5.5 h-5.5" />
                  </div>
                  <span className="font-semibold text-slate-700 text-sm">Bulk Repackaging</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white shadow-xs border border-slate-100 flex items-center justify-center text-grocella-700 font-semibold">
                    <Scale className="w-5.5 h-5.5" />
                  </div>
                  <span className="font-semibold text-slate-700 text-sm">Registered OPC</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative w-full flex items-center justify-center">
              {/* Decorative blobs */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-grocella-200 rounded-full mix-blend-multiply opacity-60 filter blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-200 rounded-full mix-blend-multiply opacity-60 filter blur-xl"></div>

              {/* Main Map operations image */}
              <div className="relative z-10 bg-white p-3 rounded-[2.5rem] shadow-xl border border-slate-100 w-full max-w-md">
                <img
                  src="/images/map.png"
                  alt="Rajasthan Logistics Hub Map"
                  className="rounded-[1.75rem] w-full h-auto object-cover border border-slate-100"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
