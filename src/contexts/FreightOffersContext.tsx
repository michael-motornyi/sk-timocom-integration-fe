'use client';

import { createContext, useContext, ReactNode } from 'react';

interface FreightOffersContextType {
  refreshOffers: () => void;
}

const FreightOffersContext = createContext<FreightOffersContextType | null>(null);

export function useFreightOffers() {
  const context = useContext(FreightOffersContext);
  if (!context) {
    throw new Error('useFreightOffers must be used within a FreightOffersProvider');
  }
  return context;
}

interface FreightOffersProviderProps {
  children: ReactNode;
  refreshOffers: () => void;
}

export function FreightOffersProvider({ children, refreshOffers }: FreightOffersProviderProps) {
  return (
    <FreightOffersContext.Provider value={{ refreshOffers }}>
      {children}
    </FreightOffersContext.Provider>
  );
}
