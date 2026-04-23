import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedTambolaCaller = () => {
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [availableNumbers, setAvailableNumbers] = useState([]);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [round, setRound] = useState(1);
  const [showBallAnimation, setShowBallAnimation] = useState(false);
  const [flyingNumber, setFlyingNumber] = useState(null);
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
  
  const timerRef = useRef(null);
  const audioRef = useRef(null);
  const boardRef = useRef(null);
  const ballRef = useRef(null);
  const numbers = Array.from({ length: 90 }, (_, i) => i + 1);
  const CALL_SPEED = 5000; // 5 seconds per number

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Initialize
  useEffect(() => {
    setAvailableNumbers([...numbers]);
  }, []);

  // Play audio file for specific number
  const playNumberAudio = useCallback((number) => {
    if (!voiceEnabled || !number) return;
    
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // Create audio element with the specific number's audio file
    const audio = new Audio(`/sounds/${number}.mp3`);
    audioRef.current = audio;
    
    audio.onerror = (error) => {
      console.error(`Failed to load audio for number ${number}:`, error);
      // Fallback to speech synthesis if audio file fails
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = `${number}`;
      utterance.lang = 'en-IN';
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    };
    
    audio.play().catch(error => {
      console.error(`Failed to play audio for number ${number}:`, error);
    });
  }, [voiceEnabled]);

  // Find board cell position
  const getBoardCellPosition = (number) => {
    if (!boardRef.current) return { x: 0, y: 0 };
    
    const cells = boardRef.current.querySelectorAll(`[data-number="${number}"]`);
    if (cells.length > 0) {
      const cell = cells[0];
      const rect = cell.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  };

  // Animate ball and call number
  const animateNumberCall = useCallback((number) => {
    setFlyingNumber(number);
    setShowBallAnimation(true);
    
    // Start ball spinning animation
    setTimeout(() => {
      // Get target position on board
      const targetPos = getBoardCellPosition(number);
      setBallPosition(targetPos);
      
      // After animation, add to called numbers
      setTimeout(() => {
        setCalledNumbers(prev => [...prev, number]);
        setShowBallAnimation(false);
        setFlyingNumber(null);
        playNumberAudio(number);
      }, 800);
    }, 1500);
  }, [playNumberAudio]);

  // Generate next number
  const generateNextNumber = useCallback(() => {
    if (availableNumbers.length === 0) {
      setIsPlaying(false);
      return null;
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const newNumber = availableNumbers[randomIndex];
    
    setCurrentNumber(newNumber);
    setAvailableNumbers(prev => prev.filter(n => n !== newNumber));
    
    // Start animation
    animateNumberCall(newNumber);
    
    return newNumber;
  }, [availableNumbers, animateNumberCall]);

  // Timer for auto-play
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        if (availableNumbers.length > 0) {
          generateNextNumber();
        } else {
          setIsPlaying(false);
          setRound(prev => prev + 1);
        }
      }, CALL_SPEED);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, availableNumbers, generateNextNumber]);

  // Controls
  const handleStart = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleNext = () => generateNextNumber();
  
  const handleReset = () => {
    setIsPlaying(false);
    setCalledNumbers([]);
    setCurrentNumber(null);
    setAvailableNumbers([...numbers]);
    setShowBallAnimation(false);
    setFlyingNumber(null);
    setRound(1);
    
    // Stop any playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0a2e] via-[#1a0a3e] to-[#0a0a2e] text-white relative overflow-hidden">
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#FBEFA4 1px, transparent 1px), linear-gradient(90deg, #FBEFA4 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-10 md:top-20 left-5 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-[#FBEFA4] rounded-full blur-[80px] md:blur-[100px] opacity-10 animate-pulse"></div>
      <div className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-[#004296] rounded-full blur-[80px] md:blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 md:py-6">
        
        

        {/* Main Game Area */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          
          {/* Left Side - Ball Machine */}
          <div className="w-full lg:w-1/3">
            <div className="bg-linear-to-br from-[#1a1a4e] to-[#0d0d2b] rounded-2xl md:rounded-3xl p-4 md:p-6 border-2 border-[#FBEFA4]/30 shadow-2xl relative overflow-hidden">
              
              {/* Machine Top */}
              <div className="absolute top-0 left-0 right-0 h-16 md:h-20 bg-linear-to-b from-[#004296]/50 to-transparent"></div>
              
              {/* Ball Display */}
              <div className="relative h-48 sm:h-56 md:h-64 flex items-center justify-center">
                
                {/* Spinning Ball Animation */}
                <motion.div
                  ref={ballRef}
                  className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
                  animate={showBallAnimation ? {
                    rotate: [0, 360, 720, 1080],
                    scale: [1, 1.1, 1, 0.9, 1]
                  } : {
                    rotate: 0
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut"
                  }}
                >
                  {/* Outer Ring */}
                  <div className="absolute inset-0 rounded-full border-3 md:border-4 border-[#FBEFA4]/50 animate-spin-slow"></div>
                  
                  {/* Middle Ring */}
                  <div className="absolute inset-1 md:inset-2 rounded-full border-2 border-[#004296] animate-spin-reverse"></div>
                  
                  {/* Inner Ball */}
                  <motion.div 
                    className="absolute inset-2 md:inset-4 rounded-full bg-linear-to-br from-[#004296] to-[#0066cc] shadow-2xl flex items-center justify-center border-2 md:border-3 border-[#FBEFA4]"
                    animate={showBallAnimation ? {
                      boxShadow: [
                        "0 0 20px #FBEFA4",
                        "0 0 60px #FBEFA4",
                        "0 0 20px #FBEFA4"
                      ]
                    } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentNumber || 'empty'}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-[#FBEFA4]"
                      >
                        {currentNumber || '🎲'}
                      </motion.span>
                    </AnimatePresence>
                  </motion.div>
                </motion.div>

                {/* Flying Number Animation */}
                <AnimatePresence>
                  {flyingNumber && (
                    <motion.div
                      initial={{ 
                        scale: 1.5, 
                        x: 0, 
                        y: 0,
                        opacity: 1 
                      }}
                      animate={{ 
                        scale: 0.8,
                        x: ballPosition.x - window.innerWidth / 2,
                        y: ballPosition.y - window.innerHeight / 2,
                        opacity: [1, 0.8, 0]
                      }}
                      transition={{ 
                        duration: 1,
                        ease: "easeOut"
                      }}
                      className="fixed z-50 pointer-events-none"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-linear-to-br from-[#FBEFA4] to-[#FFE44D] rounded-full flex items-center justify-center shadow-2xl border-2 border-white">
                        <span className="text-lg sm:text-xl md:text-2xl font-black text-[#004296]">{flyingNumber}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Machine Base */}
              <div className="mt-3 md:mt-4 p-3 md:p-4 bg-[#004296]/30 rounded-xl md:rounded-2xl border border-[#FBEFA4]/20">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5 md:gap-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500 animate-pulse"></div>
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <p className="text-white/60 text-xs md:text-sm">
                    {availableNumbers.length} balls remaining
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-3 md:mt-4 grid grid-cols-3 gap-2">
              {!isPlaying ? (
                <button
                  onClick={handleStart}
                  disabled={availableNumbers.length === 0}
                  className="col-span-2 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white py-2.5 md:py-3 px-4 rounded-lg md:rounded-xl font-bold text-sm md:text-base shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
                >
                  ▶ START ROUND {round}
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="col-span-2 bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white py-2.5 md:py-3 px-4 rounded-lg md:rounded-xl font-bold text-sm md:text-base shadow-lg transition-all transform hover:scale-105 active:scale-95"
                >
                  ⏸ PAUSE
                </button>
              )}
              
              <button
                onClick={handleNext}
                disabled={availableNumbers.length === 0}
                className="bg-[#004296] hover:bg-[#0066cc] active:bg-[#003380] text-[#FBEFA4] py-2.5 md:py-3 px-4 rounded-lg md:rounded-xl font-bold text-sm md:text-base border border-[#FBEFA4] disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
              >
                NEXT
              </button>
            </div>

            <div className="mt-2 flex justify-center">
              <button
                onClick={handleReset}
                className="text-white/40 hover:text-white text-sm transition-colors"
              >
                Reset Machine
              </button>
            </div>
          </div>

          {/* Right Side - Number Board */}
          <div className="w-full lg:w-2/3">
            <div className="bg-linear-to-br from-[#1a1a4e] to-[#0d0d2b] rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 border-2 border-[#FBEFA4]/30 shadow-2xl">
              
              {/* Board Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 md:mb-4">
                <h3 className="text-[#FBEFA4] text-base md:text-lg font-bold">NUMBER BOARD • 1-90</h3>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#004296] border border-[#FBEFA4]"></div>
                    <span className="text-white/40 text-xs">Called</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#FBEFA4]"></div>
                    <span className="text-white/40 text-xs">Current</span>
                  </div>
                </div>
              </div>

              {/* Number Grid */}
              <div ref={boardRef} className="grid grid-cols-10 gap-0.5 sm:gap-1 md:gap-2">
                {numbers.map((num) => {
                  const isCalled = calledNumbers.includes(num);
                  const isCurrent = currentNumber === num;
                  
                  return (
                    <motion.div
                      key={num}
                      data-number={num}
                      className={`
                        aspect-square flex items-center justify-center 
                        text-xs sm:text-sm md:text-base font-bold
                        rounded-md md:rounded-lg transition-all cursor-default
                        ${isCurrent 
                          ? 'bg-[#FBEFA4] text-[#004296] shadow-lg shadow-[#FBEFA4]/50 scale-110 md:scale-110' 
                          : isCalled 
                            ? 'bg-[#004296] text-[#FBEFA4] border border-[#FBEFA4]/50' 
                            : 'bg-white/5 text-white/40 border border-white/10'
                        }
                      `}
                      animate={isCalled ? {
                        scale: [1, 1.1, 1],
                        transition: { duration: 0.3 }
                      } : {}}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="select-none">{num}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Stats Bar */}
              <div className="mt-3 md:mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="bg-white/5 rounded-lg p-2 md:p-3 text-center">
                  <p className="text-white/40 text-xs">Called</p>
                  <p className="text-[#FBEFA4] font-bold text-sm md:text-base">{calledNumbers.length}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 md:p-3 text-center">
                  <p className="text-white/40 text-xs">Remaining</p>
                  <p className="text-white font-bold text-sm md:text-base">{availableNumbers.length}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 md:p-3 text-center">
                  <p className="text-white/40 text-xs">Round</p>
                  <p className="text-[#FBEFA4] font-bold text-sm md:text-base">{round}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 md:p-3 text-center">
                  <p className="text-white/40 text-xs">Status</p>
                  <p className={`font-bold text-sm md:text-base ${isPlaying ? 'text-green-400' : 'text-yellow-400'}`}>
                    {isPlaying ? 'LIVE' : 'READY'}
                  </p>
                </div>
              </div>

              {/* Recent Numbers */}
              {/* {calledNumbers.length > 0 && (
                <div className="mt-3 md:mt-4 p-2 md:p-3 bg-white/5 rounded-lg md:rounded-xl">
                  <p className="text-white/40 text-xs mb-2">Recently Called</p>
                  <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-[#FBEFA4]/50 scrollbar-track-transparent">
                    {calledNumbers.slice(-8).reverse().map((num, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg font-bold text-sm md:text-base whitespace-nowrap ${
                          i === 0 
                            ? 'bg-[#FBEFA4] text-[#004296] shadow-lg' 
                            : 'bg-white/10 text-white/70'
                        }`}
                      >
                        {num}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>

      
      </div>

      {/* Custom CSS for animations and scrollbar */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 6s linear infinite;
        }

        /* Custom scrollbar for recent numbers */
        .scrollbar-thin::-webkit-scrollbar {
          height: 4px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(251, 239, 164, 0.5);
          border-radius: 20px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgba(251, 239, 164, 0.7);
        }
      `}</style>

      {/* Responsive styles using Tailwind-style media queries */}
      <style jsx>{`
        @media (max-width: 640px) {
          .game-container {
            font-size: 14px;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .game-container {
            font-size: 15px;
          }
        }

        @media (min-width: 1025px) {
          .game-container {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedTambolaCaller;