import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Cancellation Policy | Grocella Foods" };

export default function CancellationPolicy() {
  return (
    <LegalPage
      title="Cancellation Policy"
      intro="This policy explains when and how you can cancel an order placed with Grocella Foods (OPC) Private Limited (“Grocella”, “we”, “us”) through this website."
      sections={[
        {
          heading: "Cancelling before dispatch",
          paragraphs: [
            "You may cancel an order at no charge any time before it is dispatched from our facility. Once an order is marked as dispatched, it can no longer be cancelled; please see our Return & Refund Policy instead.",
          ],
        },
        {
          heading: "How to cancel",
          bullets: [
            "Email contact@grocellafoods.com from the address used on the order, quoting your order number.",
            "We will confirm the cancellation by email. Requests are processed in the order received, so please write to us as early as possible.",
          ],
        },
        {
          heading: "Cancellation by Grocella",
          paragraphs: [
            "We may cancel an order if an item is out of stock, the delivery address is not serviceable, a pricing or listing error is found, or we are unable to verify the order. We will notify you and refund any amount you have already paid.",
          ],
        },
        {
          heading: "Refund on cancellation",
          paragraphs: [
            "For prepaid orders, the full amount is refunded to the original payment method within 5–7 business days of the cancellation being confirmed. Banks and card networks may take additional time to reflect the credit. Cash on Delivery orders cancelled before dispatch involve no payment and therefore no refund.",
          ],
        },
        {
          heading: "Bulk, wholesale and export orders",
          paragraphs: [
            "Cancellation of B2B, wholesale and export orders is governed by the terms agreed in the relevant quotation or contract, since these orders are packed and prepared to specification.",
          ],
        },
      ]}
    />
  );
}
