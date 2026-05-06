export const PAYMENT_METHODS = [
  {
    id: 'wallet',
    name: '💰 Wallet Payment',
    description: 'Pay directly from your wallet balance',
    icon: '💰',
  },
  {
    id: 'agent',
    name: '🤝 Pay via Agent',
    description: 'Contact an agent to complete your purchase',
    icon: '🤝',
  }
];

export const TICKET_TYPES = [
  { id: 'random', name: 'Single Ticket', price: 100, tickets: 1, icon: '🎲' },
  { id: 'halfsheet', name: 'Half Sheet', price: 500, tickets: 6, icon: '📄' },
  { id: 'fullsheet', name: 'Full Sheet', price: 1000, tickets: 12, icon: '📋' },
];

export const TICKETS_PER_PAGE = 6;
export const MAX_VISIBLE_PAGES = 5;