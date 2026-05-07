import React from 'react';

const ServerErrorPopup = ({ isOpen, onClose, onRetry, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-linear-to-br from-[#004296] via-[#002b66] to-[#001433] rounded-2xl sm:rounded-3xl w-full max-w-md shadow-2xl border border-[#FBEFA4]/20 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header Section */}
        <div className="text-center pt-8 pb-6 px-6">
          
          {/* Animated Warning Icon */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6">
            <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
            <div className="relative w-full h-full bg-red-500/10 rounded-full flex items-center justify-center border-2 border-red-500/30 backdrop-blur-sm">
              <span className="text-5xl sm:text-6xl motion-safe:animate-bounce">⚠️</span>
            </div>
          </div>
          
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-[#FBEFA4] mb-3 motion-safe:animate-in fade-in slide-in-from-bottom-4 duration-500">
            Server Error
          </h2>
          
          {/* Message */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 motion-safe:animate-in fade-in slide-in-from-bottom-8 duration-700">
            <p className="text-white/80 text-sm leading-relaxed">
              {message || "Something went wrong on our end. The server is not responding."}
            </p>
          </div>
        </div>

        {/* Error Detail Card */}
        <div className="px-6 pb-2">
          

          {/* Action Buttons */}
          <div className="space-y-3 pb-6">
            <button
              onClick={onRetry}
              className="w-full py-3.5 bg-[#FBEFA4] hover:bg-[#f5e894] text-[#004296] rounded-xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#FBEFA4]/20 flex items-center justify-center gap-2 group"
            >
              <span className="text-lg transition-transform duration-300 group-hover:rotate-180">🔄</span>
              <span>Retry Connection</span>
            </button>
            
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="text-lg">🏠</span>
              <span>Go to Login</span>
            </button>
          </div>

          {/* Server Status */}
          <div className="flex items-center justify-center gap-3 pb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <p className="text-white/40 text-xs flex items-center gap-1">
              Server status: 
              <span className="text-red-400 font-medium animate-pulse">Unreachable</span>
            </p>
          </div>
          
          
        </div>
        
        {/* Bottom Gradient Line */}
        <div className="h-0.5 bg-linear-to-r from-transparent via-[#FBEFA4]/30 to-transparent"></div>
      </div>
    </div>
  );
};

export default ServerErrorPopup;