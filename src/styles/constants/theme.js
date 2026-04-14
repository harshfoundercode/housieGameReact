// Tambola Theme Constants
export const THEME = {
  colors: {
    // RGB values for custom properties
    primary: '220 38 38',      // Red
    secondary: '139 69 19',     // Brown
    accent: '251 191 36',       // Yellow
    dark: '44 24 16',           // Dark Brown
    light: '254 243 199',       // Light Yellow
    muted: '120 53 15',         // Deep Brown
    gold: '217 119 6',          // Gold
    
    // Hex values for direct use
    hex: {
      primary: '#DC2626',
      secondary: '#8B4513',
      accent: '#FBBF24',
      dark: '#2C1810',
      light: '#FEF3C7',
      muted: '#78350F',
      gold: '#D97706',
    }
  },
  
  // Tailwind class strings
  classes: {
    // Backgrounds
    bgGradient: 'bg-gradient-to-br from-[#4D4D4D] via-[#FFD65C] to-[#4D4D4D]',
    bgButton: 'bg-gradient-to-r from-[#DC2626] via-[#B91C1C] to-[#D97706]',
    bgButtonTwo: 'bg-gradient-to-r from-[#636363] via-[#636363] to-[#636363]',
    bgButtonHover: 'bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]',
    bgCard: 'bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/10',
    
    // Text
    textGradient: 'bg-gradient-to-r from-[red] via-[red] to-[red] bg-clip-text text-transparent',
    textSubtitle: 'text-[#FDE68A]',
    textMuted: 'text-[#FCD34D]/60',
    
    // Borders
    borderCard: 'border border-[#FBBF24]/30',
    borderButton: 'border border-[#FBBF24]/50',
    
    // Effects
    shadowCard: 'shadow-xl hover:shadow-[#FBBF24]/20',
    shadowButton: 'shadow-2xl hover:shadow-[#FBBF24]/40',
    
    // Animations
    float: 'animate-float',
    pulse: 'animate-pulse',
  },
  
  // Inline styles for when Tailwind classes aren't enough
  styles: {
    cardOverlay: {
      background: 'rgba(220, 38, 38, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(251, 191, 36, 0.3)',
    },
    buttonGlow: {
      boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
    }
  }
};

// Common class combinations
export const CARD_STYLES = `${THEME.classes.bgCard} backdrop-blur-lg rounded-2xl p-5 ${THEME.classes.borderCard} ${THEME.classes.shadowCard} transition-all hover:scale-105`;

export const BUTTON_STYLES = `group relative px-12 py-5 ${THEME.classes.bgButton} rounded-2xl text-xl font-bold ${THEME.classes.shadowButton} transform hover:scale-105 transition-all duration-300 overflow-hidden ${THEME.classes.borderButton}`;

export const BUTTON_STYLES_TWO = `group relative px-12 py-5 ${THEME.classes.bgButtonTwo} rounded-2xl text-xl font-bold ${THEME.classes.shadowButton} transform hover:scale-105 transition-all duration-300 overflow-hidden ${THEME.classes.borderButton}`;


export const TITLE_STYLES = `text-7xl md:text-8xl font-extrabold ${THEME.classes.textGradient} leading-tight drop-shadow-lg`;