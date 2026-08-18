import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FAQSearch from '../components/faq/FAQSearch';
import FAQCategoryTabs from '../components/faq/FAQCategoryTabs';
import FAQAccordion from '../components/faq/FAQAccordion';
import SupportCard from '../components/faq/SupportCard';
import CTASection from '../components/faq/CTASection';

const FAQ_DATA = [
  // GENERAL
  {
    id: "g1",
    category: "general",
    question: "What is FA-X?",
    answer: "FA-X (Farm Access Exchange) is a digital agriculture marketplace that connects farmers directly with customers. Customers can buy fresh products, preorder crops before harvest, join group buying campaigns, and place bulk orders."
  },
  {
    id: "g2",
    category: "general",
    question: "How does FA-X work?",
    answer: "Farmers list their products with harvest dates and prices. Customers can choose to Buy Now (for already harvested crops), Preorder (reserve crops before harvest by paying an advance), or join a Group Buy (pool with other buyers to unlock discounts). After payment, farmers harvest, pack, and deliver fresh produce directly."
  },

  // CUSTOMER
  {
    id: "c1",
    category: "customer",
    question: "How do I create an account?",
    answer: "Click the 'Sign Up' or 'Register' button on the navbar, choose your profile role as 'Customer', fill in your name, email, phone number, and password, and click submit. You will immediately gain access to the Customer Dashboard."
  },
  {
    id: "c2",
    category: "customer",
    question: "How do I place an order?",
    answer: "Browse the marketplace catalog, select your items and target quantities, add them to your shopping cart, and proceed to checkout. Secure payment gateway integrations handle deposits or full payments."
  },
  {
    id: "c3",
    category: "customer",
    question: "How does preorder work?",
    answer: "Preordering allows you to reserve a crop weeks before it is harvested. You pay a small advance deposit (e.g. 20-30%) during checkout. Once the crop is harvested, you will receive a notification to clear the remaining balance, after which delivery is dispatched."
  },
  {
    id: "c4",
    category: "customer",
    question: "What is Group Buy?",
    answer: "Group Buy allows neighbors or commercial buyers to pool orders together. Once the campaign reaches its target buyer capacity (e.g. 20 buyers), a bulk discount (e.g. 20% off) is automatically unlocked for all participants."
  },
  {
    id: "c5",
    category: "customer",
    question: "Can I cancel my order?",
    answer: "Orders for already-harvested crops can be canceled before dispatch. Preorders and Group Buys carry cancellation timelines based on the expected harvest dates. Inspect the specific terms on the order details page."
  },
  {
    id: "c6",
    category: "customer",
    question: "How can I track my order?",
    answer: "Open your Customer Dashboard and select the 'Orders' tab. Each order displays its current status (e.g., pending_harvest, harvested, in_transit, delivered) along with coordinates."
  },
  {
    id: "c7",
    category: "customer",
    question: "How do refunds work?",
    answer: "If a group buy campaign fails to reach its target capacity or is canceled by the administrator, funds are credited directly back to your secure digital wallet balance instantly."
  },

  // FARMER
  {
    id: "f1",
    category: "farmer",
    question: "How do I register as a farmer?",
    answer: "Click 'Sign Up' on the navbar, select the 'Farmer' role, and fill in details including your Farm Name, village address, and phone number. After initial profile creation, proceed to the KYC page."
  },
  {
    id: "f2",
    category: "farmer",
    question: "Is KYC mandatory?",
    answer: "Yes. To maintain platform safety, farmers must upload Aadhaar, farm coordinate coordinates, and banking details. The Admin Dashboard verifies these details before crops can be listed."
  },
  {
    id: "f3",
    category: "farmer",
    question: "How do I list products?",
    answer: "Log in as a verified farmer, navigate to the 'Inventory' dashboard, and click 'Add Crop'. Specify the category, price per kg, expected harvest date, total stock weight, and support options (Preorder/Group Buy)."
  },
  {
    id: "f4",
    category: "farmer",
    question: "How do I receive payments?",
    answer: "Earnings are sent directly to your registered bank account or UPI ID. Preorder advances are dispatched when customers checkout; the remaining balances are transferred once delivery is confirmed."
  },
  {
    id: "f5",
    category: "farmer",
    question: "Can I edit my products?",
    answer: "Yes, you can update crop descriptions, stock quantities, pricing adjustments, or expected harvest dates from your Farmer Inventory panel before reservations occur."
  },
  {
    id: "f6",
    category: "farmer",
    question: "How do bulk orders work?",
    answer: "Commercial buyers submit bulk quote inquiries. You can review bulk specifications (e.g., 500kg tomatoes) and coordinate volume supply agreements via B2B channels."
  },

  // PREORDERS
  {
    id: "p1",
    category: "preorders",
    question: "What is a preorder?",
    answer: "Preordering is reserving fresh crops before they are harvested. This secures seasonal fruits (like Alphonso Mangoes) at locked rates, providing farmers with upfront cash reserves to manage inputs."
  },
  {
    id: "p2",
    category: "preorders",
    question: "How much advance payment is required?",
    answer: "FA-X preorders typically require a 20% to 30% deposit upfront depending on the crop category. The exact percentage is clearly marked on each crop listing card."
  },
  {
    id: "p3",
    category: "preorders",
    question: "When do I pay the remaining amount?",
    answer: "Once the farmer marks the crop as 'harvested' on their dashboard, you will receive an automated notification and balance payment button on your Customer Dashboard. Delivery is triggered once the balance is cleared."
  },
  {
    id: "p4",
    category: "preorders",
    question: "Can I cancel my preorder?",
    answer: "Preorders can be canceled with a full refund up to 10 days before the expected harvest date. Within 10 days, cancellations are subject to partial deductions to compensate the farmer."
  },

  // GROUP BUY
  {
    id: "gb1",
    category: "groupbuy",
    question: "What is Group Buy?",
    answer: "Group Buy is a community purchasing tool where buyers pool cart orders. Once a collective group (e.g., 10 or 20 participants) joins, the price drops automatically."
  },
  {
    id: "gb2",
    category: "groupbuy",
    question: "How do discounts work?",
    answer: "Crops marked for Group Buy carry defined target goals (e.g., 20 participants) and discount percentages (e.g., 20% off). Once target participant sizes are met, the lower rate is locked in."
  },
  {
    id: "gb3",
    category: "groupbuy",
    question: "What happens if the target isn't reached?",
    answer: "If the countdown timer expires and the group buy target is not reached, the campaign is canceled, and all participants receive automated deposits refunds back to their wallets."
  },
  {
    id: "gb4",
    category: "groupbuy",
    question: "Can I invite friends?",
    answer: "Yes! Every active Group Buy campaign page includes a 'Share Link' action. Copy the link and share it on WhatsApp or social channels to reach target participant numbers faster."
  },

  // PAYMENTS
  {
    id: "pay1",
    category: "payments",
    question: "Which payment methods are supported?",
    answer: "We support major digital transactions including UPI (Google Pay, PhonePe, Paytm), Credit Cards, Debit Cards, Net Banking, and your secure FA-X digital wallet balance."
  },
  {
    id: "pay2",
    category: "payments",
    question: "Is payment secure?",
    answer: "Yes. All payments are processed through secure gateway integrations with industry-standard encryption, protecting transactions in secure platform escrow accounts."
  },
  {
    id: "pay3",
    category: "payments",
    question: "Will I receive an invoice?",
    answer: "Yes. An automated PDF invoice detailing crop quantities, taxes, farmer details, and platform fees is generated and available for download on your Orders dashboard."
  },

  // DELIVERY
  {
    id: "d1",
    category: "delivery",
    question: "How long does delivery take?",
    answer: "For harvested spot orders, delivery takes 1-3 days. For preorders, crops are harvested on the expected harvest date, packed, and delivered to your doorstep within 24-48 hours of plucking."
  },
  {
    id: "d2",
    category: "delivery",
    question: "Can I track delivery?",
    answer: "Yes. Real-time courier coordinate updates and delivery statuses are available on your Customer Dashboard once the order is in transit."
  },
  {
    id: "d3",
    category: "delivery",
    question: "Which cities are supported?",
    answer: "Currently, FA-X operates key cold-chain logistics hubs servicing urban districts in Bihar (Patna, Muzaffarpur, Gaya) and surrounding agricultural centers in Gujarat."
  },

  // ACCOUNT
  {
    id: "a1",
    category: "account",
    question: "Forgot Password?",
    answer: "Click the 'Forgot?' link on the login screen, enter your registered email, and a secure password reset link will be sent to your inbox."
  },
  {
    id: "a2",
    category: "account",
    question: "How can I update my profile?",
    answer: "Go to your 'Profile' page via the navbar dropdown to update your profile picture, village location, UPI IDs, bank account details, and address coordinates."
  },
  {
    id: "a3",
    category: "account",
    question: "How do I delete my account?",
    answer: "To request account termination, contact our admin support desk at support@fax.com to settle active wallet balances and outstanding orders."
  },

  // SECURITY
  {
    id: "s1",
    category: "security",
    question: "Is my personal data safe?",
    answer: "Yes. User profiles, bank details, and identity documents are encrypted and protected under strict Firestore collection permissions."
  },
  {
    id: "s2",
    category: "security",
    question: "How are KYC documents handled?",
    answer: "Farmers' Aadhaar and bank details are accessed exclusively by verified administrators to confirm legitimacy, preventing platform frauds."
  }
];

const FAQPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("general");
  const [openIndex, setOpenIndex] = useState(null);

  // Filter FAQs based on search and selected category
  const filteredFAQs = FAQ_DATA.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    // If searching, search globally across all categories, otherwise filter by active tab
    const matchesCategory = searchQuery !== "" || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Dynamic Google FAQ Rich Result Schema (JSON-LD) injection
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_DATA.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const scriptId = "faq-jsonld-schema";
    let script = document.getElementById(scriptId);
    
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    
    script.text = JSON.stringify(faqSchema);

    return () => {
      const activeScript = document.getElementById(scriptId);
      if (activeScript) {
        document.head.removeChild(activeScript);
      }
    };
  }, []);

  const handleToggle = (id) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  // Helper to highlight matching text in questions/answers
  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => 
          regex.test(part) 
            ? <mark key={i} className="bg-yellow-100 text-dark rounded-sm px-0.5">{part}</mark> 
            : part
        )}
      </span>
    );
  };

  return (
    <div className="space-y-16 max-w-5xl mx-auto py-6">
      
      {/* 1. HERO SECTION */}
      <div className="text-center space-y-6 max-w-2xl mx-auto relative overflow-hidden pb-4">
        {/* Decorative background grid illustration */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
          <div className="w-full h-full bg-[radial-gradient(#2E7D32_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        <span className="bg-emerald-100 text-primary border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest relative z-10">
          ❓ FA-X Help Center
        </span>

        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-dark leading-tight relative z-10">
          Frequently Asked Questions
        </h1>

        <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed relative z-10">
          Find answers to the most common questions about FA-X. Learn how our marketplace, preorder system, group buying, payments, and deliveries work.
        </p>

        {/* 2. SEARCH BOX */}
        <FAQSearch 
          query={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      {/* 3. CATEGORY TABS (Only show when NOT searching globally) */}
      {searchQuery === "" && (
        <FAQCategoryTabs 
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setOpenIndex(null);
          }}
        />
      )}

      {/* 4. ACCORDION FAQ ITEMS */}
      <div className="bg-white border border-emerald-500/5 p-6 md:p-8 rounded-3xl shadow-sm max-w-3xl mx-auto">
        <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-4 border-b border-gray-50 pb-2">
          {searchQuery !== "" ? `Search Results (${filteredFAQs.length})` : `${activeCategory} Questions`}
        </h3>

        {filteredFAQs.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {filteredFAQs.map(faq => (
              <FAQAccordion 
                key={faq.id}
                id={faq.id}
                question={highlightText(faq.question, searchQuery)}
                answer={highlightText(faq.answer, searchQuery)}
                isOpen={openIndex === faq.id}
                onToggle={() => handleToggle(faq.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-3">
            <span className="text-4xl block">🔍</span>
            <p className="font-bold text-dark text-sm">No Matching Questions Found</p>
            <p className="text-[10px] text-gray-400 max-w-xs mx-auto leading-normal">
              We couldn't find any results for "{searchQuery}". Try searching for categories like Preorder, KYC, or Wallet.
            </p>
          </div>
        )}
      </div>

      {/* 5. SUPPORT PANEL */}
      <SupportCard />

      {/* 6. BOTTOM CTA */}
      <CTASection 
        onExplore={() => navigate('/')}
        onRegister={() => navigate('/register')}
      />

    </div>
  );
};

export default FAQPage;
export { FAQ_DATA };
