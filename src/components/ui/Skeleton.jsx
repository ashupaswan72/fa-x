import React from 'react';

const Skeleton = ({ variant = 'text', className = '' }) => {
  const baseClass = "animate-pulse bg-emerald-100 rounded-lg";
  
  const variants = {
    text: "h-4 w-3/4 my-2",
    title: "h-7 w-1/2 my-4",
    avatar: "h-12 w-12 rounded-full",
    card: "h-64 w-full rounded-2xl",
    button: "h-10 w-28"
  };

  return (
    <div className={`${baseClass} ${variants[variant]} ${className}`} />
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-emerald-50 border-opacity-50 shadow-sm animate-pulse space-y-4">
      <div className="h-44 w-full bg-emerald-50 rounded-xl" />
      <div className="h-4 w-1/3 bg-emerald-50" />
      <div className="h-6 w-2/3 bg-emerald-50" />
      <div className="h-4 w-full bg-emerald-50" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 w-1/4 bg-emerald-50" />
        <div className="h-10 w-1/3 bg-emerald-50 rounded-xl" />
      </div>
    </div>
  );
};

export default Skeleton;
