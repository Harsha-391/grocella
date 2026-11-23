import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Contact Us | Grocella Foods" };

export default function ContactUs() {
  return (
    <LegalPage
      title="Contact Us"
      intro="For orders, payments, refunds, cancellations or any other questions, reach Grocella Foods (OPC) Private Limited using the details below. We respond within 24 working hours."
      sections={[
        {
          heading: "Registered Office",
          paragraphs: [
            "Grocella Foods (OPC) Private Limited, 2nd Floor, S.N-B10, P.No-781, Arihant Plaza, Dadabari, Kota, Rajasthan 324009, India",
          ],
        },
        { heading: "Email", paragraphs: ["grocellafoods@gmail.com"] },
        { heading: "Phone", paragraphs: ["+91 72400 61285"] },
      ]}
    />
  );
}
