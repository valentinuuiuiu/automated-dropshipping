


import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

interface CreditContextType {
  credits: number;
  addCredits: (amount: number) => Promise<void>;
  deductCredits: (amount: number) => Promise<boolean>;
  canAfford: (amount: number) => boolean;
  isLoading: boolean;
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export function CreditProvider({ children }: { children: ReactNode }) {
  const [credits, setCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const loadCredits = async () => {
      if (!session?.user?.id) return;
      try {
        const res = await fetch(`/api/users/${session.user.id}/credits`);
        const data = await res.json();
        setCredits(data.credits || 0);
      } catch (error) {
        console.error('Credit load failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCredits();
  }, [session]);

  const updateCredits = async (newCredits: number) => {
    if (!session?.user?.id) return;
    await fetch(`/api/users/${session.user.id}/credits`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credits: newCredits })
    });
  };

  const addCredits = async (amount: number) => {
    const newTotal = credits + amount;
    setCredits(newTotal);
    await updateCredits(newTotal);
  };

  const deductCredits = async (amount: number) => {
    if (credits < amount) return false;
    const newTotal = credits - amount;
    setCredits(newTotal);
    await updateCredits(newTotal);
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


