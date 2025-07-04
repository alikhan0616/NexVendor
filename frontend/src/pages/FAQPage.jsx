import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import styles from "../styles/styles";

const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <FAQ />
      <Footer />
    </div>
  );
};

const FAQ = () => {
  const [activeTab, setActiveTab] = useState(0);

  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "If you're not satisfied with your purchase, we accept returns within 30 days of delivery. To initiate a return, please email us at support@myecommercestore.com with your order number and a brief explanation of why you're returning the item.",
    },
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by clicking the tracking link in your shipping confirmation email, or by logging into your account on our website and viewing the order details.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can contact our customer support team by emailing us at support@myecommercestore.com, or by calling us at (555) 123-4567 between the hours of 9am and 5pm EST, Monday through Friday.",
    },
    {
      question: "Can I change or cancel my order?",
      answer:
        "Unfortunately, once an order has been placed, we are not able to make changes or cancellations. If you no longer want the items you've ordered, you can return them for a refund within 30 days of delivery.",
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we only offer shipping within the Pakistan.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept visa, mastercard, paypal payment method also we have cash on delivery system.",
    },
  ];

  return (
    <div className={`${styles.section} my-8`}>
      <h2 className="text-3xl font-bold text-slate-700 mb-8 tracking-tight">
        Frequently Asked Questions
      </h2>
      <div className="mx-auto max-w-2xl space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className={`rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 ${
              activeTab === idx ? "ring-2 ring-orange-200" : ""
            }`}
          >
            <button
              className="flex items-center justify-between w-full px-6 py-5 focus:outline-none"
              onClick={() => setActiveTab(activeTab === idx ? -1 : idx)}
              aria-expanded={activeTab === idx}
            >
              <span className="text-lg font-semibold text-[#B66E41] text-left">
                {faq.question}
              </span>
              <span className="ml-4 flex-shrink-0">
                {activeTab === idx ? (
                  <svg
                    className="h-6 w-6 text-orange-600 transition-transform duration-300 rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 text-slate-400 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeTab === idx ? "max-h-96 px-6 pb-6" : "max-h-0 px-6"
              }`}
            >
              <p className="text-base text-slate-700">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
