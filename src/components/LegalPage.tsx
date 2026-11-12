import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export type PolicySection = { heading: string; paragraphs?: string[]; bullets?: string[] };

export const LAST_UPDATED = "12 November 2026";

export default function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: PolicySection[] }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-slate-900">{title}</h1>
          <p className="text-xs text-slate-500 mt-2">Last updated: {LAST_UPDATED}</p>
          <p className="mt-6 text-slate-700 leading-relaxed">{intro}</p>
          {sections.map((s, i) => (
            <section key={s.heading} className="mt-8">
              <h2 className="font-serif font-bold text-xl text-slate-900">
                {i + 1}. {s.heading}
              </h2>
              {s.paragraphs?.map((p) => (
                <p key={p} className="mt-3 text-slate-700 leading-relaxed">{p}</p>
              ))}
              {s.bullets && (
                <ul className="mt-3 list-disc pl-6 space-y-1.5 text-slate-700 leading-relaxed">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <p className="mt-10 text-sm text-slate-600 border-t border-slate-200 pt-6">
            Grocella Foods (OPC) Private Limited, Rajasthan, India. Questions? Email{" "}
            <a href="mailto:contact@grocellafoods.com" className="text-grocella-700 font-semibold hover:underline">
              contact@grocellafoods.com
            </a>
            .
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
