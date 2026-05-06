import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes';
import logoImage from '../../../assets/tambolaGame.jpeg';

const GameHeader = ({ gameName, getCartCount, setShowCart }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* LOGO HEADER */}
      <div className="flex justify-center mb-2">
        <div
          onClick={() => navigate(ROUTES.HOME)}
          className="relative group cursor-pointer"
        >
          <div className="absolute inset-0 bg-[#FBEFA4] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
          <div className="relative w-20 h-20 md:w-24 md:h-24 bg-linear-to-br from-[#004296] to-[#002b66] rounded-full flex items-center justify-center border-4 border-[#FBEFA4] shadow-xl overflow-hidden">
            <img
              src={logoImage}
              alt="Tambola Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Game Header */}
      <div className="overflow-hidden rounded-b-3xl bg-linear-to-r from-[#004296] to-[#003380] p-2 md:p-3 relative border border-[#FBEFA4]/30">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#FBEFA4] rounded-full filter blur-3xl opacity-10"></div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center flex-1 bg-linear-to-r from-[#FBEFA4] via-white to-[#FBEFA4] bg-clip-text text-transparent tracking-wider">
            {gameName}
          </h1>
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-[#FBEFA4] hover:bg-[#FFE44D] text-[#004296] px-4 py-2 rounded-xl font-bold text-sm md:text-base shadow-lg transition-all transform hover:scale-105"
          >
            🛒 Cart {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default GameHeader;