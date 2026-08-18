import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary', 'secondary', 'accent', 'danger', 'outline', 'glass'
  size = 'md', // 'sm', 'md', 'lg'
  disabled = false,
  loading = false,
  className = '',
  fullWidth = false,
  ...props
}) => {
  const baseStyle = "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";
  
  const variants = {
    primary: "bg-primary hover:bg-primary-hover text-white shadow-md shadow-emerald-800/10 hover:shadow-lg hover:shadow-emerald-800/20",
    secondary: "bg-secondary text-white hover:bg-emerald-500 shadow-md shadow-green-700/10",
    accent: "gradient-accent text-dark hover:shadow-lg hover:shadow-amber-500/20",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/10",
    outline: "border-2 border-primary text-primary hover:bg-emerald-50/50",
    glass: "glass-card text-emerald-800 border border-white hover:bg-emerald-50/30"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  const combinedClasses = `${baseStyle} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={combinedClasses}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </motion.button>
  );
};

export default Button;
