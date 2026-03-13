import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface CreditContextType {
  credits: number;
  addCredits: (amount: number) => Promise<void>;
  deductCredits: (amount: number) => Promise<boolean>;
  canAfford: (amount: number) => boolean;
  isLoading: boolean;
}

export const CreditContext = createContext<CreditContextType | undefined>(undefined);

export function CreditProvider({ children }: { children: ReactNode }) {
  const [credits, setCredits] = useState(100); // Default starting credits
  const [isLoading] = useState(false);

  useEffect(() => {
    // Load credits from localStorage on mount
    const saved = localStorage.getItem('credits');
    if (saved) {
      setCredits(parseInt(saved, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('credits', credits.toString());
  }, [credits]);

  const addCredits = async (amount: number) => {
    const newTotal = credits + amount;
    setCredits(newTotal);
  };

  const deductCredits = async (amount: number) => {
    if (credits < amount) return false;
    const newTotal = credits - amount;
    setCredits(newTotal);
    return true;
  };

  const canAfford = (amount: number) => credits >= amount;

  return (
    <CreditContext.Provider 
      value={{ credits, addCredits, deductCredits, canAfford, isLoading }}
    >
      {children}
    </CreditContext.Provider>
  );
}

export function useCredits() {
  const context = useContext(CreditContext);
  if (!context) {
    throw new Error('useCredits must be used within CreditProvider');
  }
  return context;
}


