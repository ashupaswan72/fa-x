import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  glass = false,
  dark = false,
  hoverable = false,
  className = '',
  onClick,
  ...props
}) => {
  let cardClass = "rounded-2xl p-6 transition-all duration-300 ";
  
  if (glass) {
    cardClass += dark ? "glass-card-dark" : "glass-card";
  } else {
    cardClass += dark 
      ? "bg-dark text-white shadow-xl" 
      : "bg-white text-dark shadow-md shadow-emerald-950/5 border border-emerald-500/5";
  }

  if (hoverable) {
    cardClass += " hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-950/5 cursor-pointer";
  }

  const combinedClasses = `${cardClass} ${className}`;

  if (onClick) {
    return (
      <motion.div
        whileHover={hoverable ? { y: -4 } : {}}
        onClick={onClick}
        className={combinedClasses}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;
