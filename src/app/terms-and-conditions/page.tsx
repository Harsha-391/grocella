import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms & Conditions | Grocella Foods" };

export default function TermsAndConditions() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="These terms govern your use of this website and any purchase you make from Grocella Foods (OPC) Private Limited (“Grocella”, “we”, “us”). By using the website or placing an order you agree to them."
      sections={[
        {
          heading: "About us",
          paragraphs: [
            "Grocella Foods (OPC) Private Limited is a company incorporated in India, based in Rajasthan, that manufactures, processes and distributes packaged grocery and agricultural products, including cereals, pulses, grains and spices.",
          ],
        },
        {
          heading: "Using the website",
          paragraphs: [
            "You must be at least 18 years old, or use the website under the supervision of a parent or guardian, to place an order. You agree to give accurate details and not to misuse the website, attempt unauthorised access, or interfere with its operation.",
          ],
        },
        {
          heading: "Products and pricing",
          paragraphs: [
            "We try to describe and display products accurately, but weights, packaging and images may vary slightly. All prices are in Indian Rupees (INR) and include applicable taxes unless stated otherwise. We may correct pricing or listing errors and cancel affected orders, refunding any amount paid.",
          ],
        },
        {
          heading: "Orders and payment",
          paragraphs: [
            "An order is accepted only when we confirm it. Payment may be made by Cash on Delivery where offered, or online through our third-party payment gateway. We do not store your card or banking details; they are handled by the payment gateway under its own security standards.",
          ],
        },
        {
          heading: "Shipping and delivery",
          paragraphs: [
            "Delivery timelines shown are estimates and may be affected by location, weather or courier delays. Risk in the goods passes to you on delivery. Please check the package on receipt and report any problem as described in our Return & Refund Policy.",
          ],
        },
        {
          heading: "Cancellations, returns and refunds",
          paragraphs: [
            "Cancellations, returns and refunds are governed by our Cancellation Policy and Return & Refund Policy, which form part of these terms.",
          ],
        },
        {
          heading: "Wholesale, franchise and export enquiries",
          paragraphs: [
            "Enquiries submitted through the B2B portal are not binding offers. Wholesale, franchise and export supply is subject to a separate written agreement or quotation.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "All content on this website, including the Grocella name, logo, text and images, belongs to Grocella or its licensors. You may not copy or use it commercially without our written permission.",
          ],
        },
        {
          heading: "Limitation of liability",
          paragraphs: [
            "To the extent permitted by law, we are not liable for indirect or consequential losses, or for delays or failures caused by events beyond our reasonable control. Our total liability for any order is limited to the amount you paid for it. Nothing in these terms limits your rights under applicable consumer protection law.",
          ],
        },
        {
          heading: "Privacy",
          paragraphs: ["Our use of your personal data is described in our Privacy Policy."],
        },
        {
          heading: "Governing law and disputes",
          paragraphs: [
            "These terms are governed by the laws of India. The courts at Rajasthan have exclusive jurisdiction over any dispute, subject to your statutory rights as a consumer.",
          ],
        },
        {
          heading: "Changes to these terms",
          paragraphs: [
            "We may update these terms from time to time. The version published on this page, with its “last updated” date, applies to orders placed after that date.",
          ],
        },
      ]}
    />
  );
}
