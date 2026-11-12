import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy | Grocella Foods" };

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Grocella Foods (OPC) Private Limited (“Grocella”, “we”, “us”) respects your privacy. This policy explains what personal data we collect through this website, why, and the choices you have."
      sections={[
        {
          heading: "Information we collect",
          bullets: [
            "Order details: your name, phone number, email address, delivery address and the items you order.",
            "Enquiry details: information you submit through the B2B, franchise and export enquiry forms.",
            "Payment status: we receive confirmation of whether a payment succeeded from our payment gateway. We do not see or store your full card, UPI or net-banking credentials.",
            "Technical data: browser type, device and pages visited, collected through standard server logs and cookies.",
          ],
        },
        {
          heading: "How we use your information",
          bullets: [
            "To process, deliver and support your orders, including refunds and cancellations.",
            "To respond to your enquiries.",
            "To prevent fraud and keep the website secure.",
            "To meet legal, tax and accounting obligations.",
          ],
        },
        {
          heading: "Cookies",
          paragraphs: [
            "We use cookies to keep your cart working and, for your convenience, to remember your checkout details on your device for up to 30 days. You can clear or block cookies in your browser settings; some features may then not work.",
          ],
        },
        {
          heading: "Sharing your information",
          paragraphs: [
            "We do not sell your personal data. We share it only with service providers who help us run the business (payment gateway, courier and logistics partners, hosting and database providers), and only to the extent needed for them to perform their service. We may also disclose information where required by law or a government authority.",
          ],
        },
        {
          heading: "Data retention and security",
          paragraphs: [
            "We keep personal data only as long as needed for the purposes above and as required by law. We use reasonable technical and organisational safeguards, but no online service can guarantee absolute security.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "Subject to applicable Indian law, including the Digital Personal Data Protection Act, 2023, you may ask us to access, correct or delete your personal data, or withdraw consent to its processing. Email contact@grocellafoods.com and we will respond within a reasonable time.",
          ],
        },
        {
          heading: "Children",
          paragraphs: [
            "This website is not directed at children under 18, and we do not knowingly collect their personal data.",
          ],
        },
        {
          heading: "Changes to this policy",
          paragraphs: [
            "We may update this policy from time to time. The current version is always available on this page with its “last updated” date.",
          ],
        },
      ]}
    />
  );
}
