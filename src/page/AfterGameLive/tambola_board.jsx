import React, { useState, useEffect, useRef, useCallback } from "react";

const TambolaCaller = () => {
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [availableNumbers, setAvailableNumbers] = useState([]);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  const timerRef = useRef(null);
  const speechSynthRef = useRef(window.speechSynthesis);
  const isSpeakingRef = useRef(false);
  const numbers = Array.from({ length: 90 }, (_, i) => i + 1);
  const CALL_SPEED = 3500;

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Initialize
  useEffect(() => {
    setAvailableNumbers([...numbers]);
  }, []);

  // Speak number
  const speakNumber = useCallback((number) => {
    if (!voiceEnabled || !number) return;
    
    speechSynthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = `${number}`;
    utterance.lang = 'en-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    utterance.volume = 1;
    
    isSpeakingRef.current = true;
    utterance.onend = () => {
      isSpeakingRef.current = false;
    };
    
    speechSynthRef.current.speak(utterance);
  }, [voiceEnabled]);

  // Generate next number
  const generateNextNumber = useCallback(() => {
    if (availableNumbers.length === 0) {
      setIsPlaying(false);
      return null;
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const newNumber = availableNumbers[randomIndex];
    
    setCurrentNumber(newNumber);
    setCalledNumbers(prev => [...prev, newNumber]);
    setAvailableNumbers(prev => prev.filter(n => n !== newNumber));
    
    if (!isSpeakingRef.current) {
      speakNumber(newNumber);
    }
    
    return newNumber;
  }, [availableNumbers, speakNumber]);

  // Timer for auto-play
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        if (availableNumbers.length > 0) {
          generateNextNumber();
        } else {
          setIsPlaying(false);
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
    speechSynthRef.current.cancel();
    isSpeakingRef.current = false;
  };

  // Cleanup
  useEffect(() => {
    return () => {
      speechSynthRef.current.cancel();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <>
      <style>
        {`
          /* Mobile Styles (max-width: 640px) */
          @media (max-width: 640px) {
            .caller-container {
              padding: 0.5rem !important;
            }
            
            .two-column-layout {
              grid-template-columns: 1fr !important;
              gap: 0.75rem !important;
            }
            
            .current-number-box {
              width: 100% !important;
              max-width: 200px !important;
              margin: 0 auto !important;
            }
            
            .current-number-text {
              font-size: 4rem !important;
            }
            
            .stats-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
            
            .control-buttons {
              gap: 0.5rem !important;
            }
            
            .board-grid {
              gap: 1px !important;
            }
            
            .board-cell {
              font-size: 8px !important;
            }
            
            .header-title {
              font-size: 0.875rem !important;
            }
          }

          /* Tablet Styles (min-width: 641px and max-width: 1024px) */
          @media (min-width: 641px) and (max-width: 1024px) {
            .two-column-layout {
              grid-template-columns: 1fr 1.2fr !important;
              gap: 1rem !important;
            }
            
            .current-number-text {
              font-size: 3.5rem !important;
            }
            
            .board-cell {
              font-size: 9px !important;
            }
          }

          /* Desktop Styles (min-width: 1025px) */
          @media (min-width: 1025px) {
            .two-column-layout {
              grid-template-columns: 1fr 1fr !important;
              gap: 1rem !important;
            }
            
            .current-number-text {
              font-size: 5rem !important;
            }
            
            .board-cell {
              font-size: 10px !important;
            }
          }
        `}
      </style>

      <div className="caller-container bg-[#004296]/40 backdrop-blur-sm rounded-2xl p-2 md:p-3 border-2 border-[#FBEFA4]/30">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <h3 className="header-title text-[#FBEFA4] text-xs md:text-sm font-bold flex items-center gap-1">
            <span>🎲</span> 
            {!isMobile && "Tambola Caller"}
          </h3>
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-xs ${voiceEnabled ? 'bg-[#FBEFA4] text-[#004296]' : 'bg-white/10 text-white/60'}`}
          >
            {voiceEnabled ? '🔊' : '🔇'}
          </button>
        </div>

        {/* Two Column Layout - Responsive */}
        <div className="two-column-layout grid gap-2 md:gap-3">
          
          {/* LEFT PANEL - Controls & Stats */}
          <div className="space-y-2">
            
            {/* Current Number */}
            <div className="current-number-box bg-gradient-to-br from-[#FBEFA4] to-[#FFE44D] w-full aspect-square max-w-[160px] md:max-w-none mx-auto md:mx-0 rounded-xl flex items-center justify-center shadow-md border-2 border-white">
              <span className="current-number-text font-black text-[#004296] text-4xl md:text-5xl">
                {currentNumber || '--'}
              </span>
            </div>

            {/* Stats */}
            <div className="stats-grid grid grid-cols-2 gap-1 md:gap-1.5">
              <div className="bg-white/10 rounded-lg p-1 md:p-1.5 text-center">
                <p className="text-white/40 text-[8px] md:text-[9px]">Remaining</p>
                <p className="text-sm md:text-base font-bold text-[#FBEFA4]">{availableNumbers.length}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-1 md:p-1.5 text-center">
                <p className="text-white/40 text-[8px] md:text-[9px]">Called</p>
                <p className="text-sm md:text-base font-bold text-white">{calledNumbers.length}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="w-full bg-white/20 rounded-full h-1 md:h-1.5">
                <div 
                  className="bg-[#FBEFA4] h-1 md:h-1.5 rounded-full transition-all"
                  style={{ width: `${(calledNumbers.length / 90) * 100}%` }}
                ></div>
              </div>
              <p className="text-white/40 text-[8px] md:text-[9px] mt-0.5 text-right">{calledNumbers.length}/90</p>
            </div>

            {/* Control Buttons */}
            <div className="control-buttons grid grid-cols-1 gap-1 md:gap-1.5">
              {!isPlaying ? (
                <button
                  onClick={handleStart}
                  disabled={availableNumbers.length === 0}
                  className="bg-green-500 hover:bg-green-600 text-white py-1.5 md:py-2 rounded-lg font-bold text-[10px] md:text-xs disabled:opacity-50"
                >
                  ▶ START
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1.5 md:py-2 rounded-lg font-bold text-[10px] md:text-xs"
                >
                  ⏸ PAUSE
                </button>
              )}
              
              <div className="grid grid-cols-2 gap-1 md:gap-1.5">
                <button
                  onClick={handleNext}
                  disabled={availableNumbers.length === 0}
                  className="bg-[#004296] hover:bg-[#003380] text-[#FBEFA4] py-1.5 md:py-2 rounded-lg font-bold text-[10px] md:text-xs border border-[#FBEFA4] disabled:opacity-50"
                >
                  NEXT
                </button>
                
                <button
                  onClick={handleReset}
                  className="bg-red-500 hover:bg-red-600 text-white py-1.5 md:py-2 rounded-lg font-bold text-[10px] md:text-xs"
                >
                  RESET
                </button>
              </div>
            </div>

            {/* Recent Numbers */}
            {calledNumbers.length > 0 && (
              <div className="pt-1">
                <p className="text-white/40 text-[8px] md:text-[9px] mb-1">Recent:</p>
                <div className="flex flex-wrap gap-0.5 md:gap-1">
                  {calledNumbers.slice(-4).reverse().map((num, i) => (
                    <span
                      key={i}
                      className={`px-1 md:px-1.5 py-0.5 rounded text-[9px] md:text-[10px] font-medium ${
                        i === 0 ? 'bg-[#FBEFA4] text-[#004296]' : 'bg-white/10 text-white/70'
                      }`}
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT PANEL - Number Board */}
          <div className="bg-[#001a33]/30 rounded-lg p-1 md:p-1.5">
            <p className="text-[#FBEFA4] text-[8px] md:text-[9px] font-medium mb-1 text-center">
              Board (1-90)
            </p>
            <div className="board-grid grid grid-cols-10 gap-[1px] md:gap-[2px]">
              {numbers.map((num) => {
                const isCalled = calledNumbers.includes(num);
                const isCurrent = currentNumber === num;
                
                return (
                  <div
                    key={num}
                    className={`
                      board-cell flex items-center justify-center 
                      text-[7px] md:text-[9px] font-bold
                      rounded-sm transition-all
                      ${isCurrent 
                        ? 'bg-[#004296] text-[#FBEFA4] border border-[#FBEFA4] scale-105 md:scale-110 shadow-md' 
                        : isCalled 
                          ? 'bg-[#FBEFA4] text-[#004296]' 
                          : 'bg-white/10 text-white/50'
                      }
                    `}
                    style={{ aspectRatio: '1/1' }}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center gap-2 md:gap-3 mt-1 md:mt-1.5">
              <div className="flex items-center gap-0.5 md:gap-1">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#FBEFA4] rounded-sm"></div>
                <span className="text-white/40 text-[7px] md:text-[8px]">Called</span>
              </div>
              <div className="flex items-center gap-0.5 md:gap-1">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#004296] rounded-sm border border-[#FBEFA4]"></div>
                <span className="text-white/40 text-[7px] md:text-[8px]">Current</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TambolaCaller;