import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQAccordion = ({ question, answer, isOpen, onToggle, id }) => {
  return (
    <div className="border-b border-emerald-500/5 py-4">
      {/* Accordion Trigger header */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
        id={`faq-btn-${id}`}
        className="w-full flex justify-between items-center text-left py-3 font-bold text-dark text-xs sm:text-sm hover:text-primary transition-colors cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
      >
        <span className="pr-4 leading-normal">{question}</span>
        <ChevronDown 
          className={`w-4.5 h-4.5 text-gray-400 group-hover:text-primary transition-transform duration-300 shrink-0 ${
            isOpen ? 'rotate-180 text-primary' : ''
          }`} 
        />
      </button>

      {/* Accordion Answer Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${id}`}
            role="region"
            aria-labelledby={`faq-btn-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 pt-1 text-[11px] sm:text-xs text-gray-500 leading-relaxed font-semibold whitespace-pre-line pl-1">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQAccordion;
