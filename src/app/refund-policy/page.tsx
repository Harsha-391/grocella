import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Return & Refund Policy | Grocella Foods" };

export default function RefundPolicy() {
  return (
    <LegalPage
      title="Return & Refund Policy"
      intro="We want you to be happy with every Grocella product. Because we sell food items, returns are accepted only in the cases described below."
      sections={[
        {
          heading: "When you can return or ask for a refund",
          bullets: [
            "The product arrived damaged, leaking or tampered with.",
            "You received a different product or quantity from what you ordered.",
            "The product is expired or has less than the stated shelf life remaining on delivery.",
            "The product is of visibly poor quality (for example spoilage, infestation or foreign matter).",
          ],
        },
        {
          heading: "What cannot be returned",
          bullets: [
            "Products that have been opened, used or partly consumed, unless they are defective or unsafe.",
            "Products damaged through improper storage or handling after delivery.",
            "Change-of-mind returns on food items, for food safety reasons.",
          ],
        },
        {
          heading: "How to request a return or refund",
          paragraphs: [
            "Email contact@grocellafoods.com within 48 hours of delivery with your order number, a short description of the issue, and clear photos of the product, batch/expiry label and packaging. We may ask for a short unboxing video for damage claims.",
          ],
        },
        {
          heading: "Review and pickup",
          paragraphs: [
            "We review requests within 2 business days. If approved, we will either arrange a reverse pickup or ask you to dispose of the product, and we will tell you which. Please keep the item and its original packaging until we confirm.",
          ],
        },
        {
          heading: "Refunds",
          bullets: [
            "Approved refunds are issued to the original payment method within 5–7 business days of approval. Your bank or card issuer may take additional time to show the credit.",
            "For Cash on Delivery orders, we will refund by bank transfer; we will ask for your account details by email.",
            "Where appropriate we may offer a free replacement instead of a refund; this is only done with your consent.",
            "Original shipping charges are refunded only when the return is due to our error or a defective product.",
          ],
        },
        {
          heading: "Bulk, wholesale and export orders",
          paragraphs: [
            "Claims on B2B, wholesale and export orders follow the inspection and claim terms in the relevant contract or quotation.",
          ],
        },
      ]}
    />
  );
}
