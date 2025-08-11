import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-base-100">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-t-transparent border-indigo-600 rounded-full animate-spin shadow-lg"></div>
        <p className="text-lg font-semibold text-indigo-600 animate-pulse tracking-wide">
          C O U R S I O N
        </p>
      </div>
    </div>
  );
};

export default Loading;
