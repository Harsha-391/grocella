import React from "react";
import Link from "next/link";
import { Leaf, Linkedin, Instagram, Facebook, MapPin, Mail, Phone, ChevronRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t-4 border-grocella-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <Leaf className="text-grocella-400 w-7 h-7" />
              <span className="font-serif font-black text-2xl text-white tracking-tight">GROCELLA</span>
            </Link>
            <p className="text-sm text-slate-450 leading-relaxed">
              <strong>GROCELLA FOODS (OPC) PRIVATE LIMITED</strong>
              <br />
              Nourishing communities through premium quality agricultural produce and packaged food products. Sourced with integrity, processed to perfection.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-450 hover:text-white p-2 hover:bg-slate-800 rounded-lg transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-450 hover:text-white p-2 hover:bg-slate-800 rounded-lg transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-450 hover:text-white p-2 hover:bg-slate-800 rounded-lg transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Portals */}
          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6 tracking-wide">Our Portals</h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link
                  href="/retail"
                  className="hover:text-grocella-400 transition-colors flex items-center gap-1.5 font-medium group"
                >
                  <ChevronRight className="w-4 h-4 text-grocella-500 group-hover:translate-x-0.5 transition-transform" />
                  Retail Shop (B2C)
                </Link>
              </li>
              <li>
                <Link
                  href="/b2b"
                  className="hover:text-grocella-400 transition-colors flex items-center gap-1.5 font-medium group"
                >
                  <ChevronRight className="w-4 h-4 text-grocella-500 group-hover:translate-x-0.5 transition-transform" />
                  Wholesale Login (B2B)
                </Link>
              </li>
              <li>
                <Link
                  href="/b2b#inquiry"
                  className="hover:text-grocella-400 transition-colors flex items-center gap-1.5 font-medium group"
                >
                  <ChevronRight className="w-4 h-4 text-grocella-500 group-hover:translate-x-0.5 transition-transform" />
                  Franchise Inquiry
                </Link>
              </li>
              <li>
                <Link
                  href="/b2b#export"
                  className="hover:text-grocella-400 transition-colors flex items-center gap-1.5 font-medium group"
                >
                  <ChevronRight className="w-4 h-4 text-grocella-500 group-hover:translate-x-0.5 transition-transform" />
                  Export Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate */}
          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6 tracking-wide">Corporate</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#about" className="hover:text-grocella-400 transition-colors font-medium">
                  About the Company
                </Link>
              </li>
              <li>
                <Link href="/#channels" className="hover:text-grocella-400 transition-colors font-medium">
                  Manufacturing Facilities
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-grocella-400 transition-colors font-medium">
                  Quality & Certifications
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-grocella-400 transition-colors font-medium">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-grocella-400 transition-colors font-medium">
                  Legal & Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6 tracking-wide">Headquarters</h4>
            <ul className="space-y-4.5 text-sm">
              <li className="flex items-start gap-3 leading-relaxed">
                <MapPin className="w-5 h-5 text-grocella-400 mt-0.5 flex-shrink-0" />
                <span>
                  Rajasthan, India
                  <br />
                  <span className="text-slate-450 text-xs">(Full address available upon request)</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-grocella-400 flex-shrink-0" />
                <a href="mailto:contact@grocellafoods.com" className="hover:text-white transition-colors">
                  contact@grocellafoods.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-grocella-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 (XXX) XXX-XXXX
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>
            &copy; {currentYear} Grocella Foods (OPC) Private Limited. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0 flex items-center gap-1.5">
            Designed for agricultural and export excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}
