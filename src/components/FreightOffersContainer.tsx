'use client';

import { useState, useEffect } from 'react';
import type { FreightOffer } from '@/types';
import FreightOffersList from '@/components/FreightOffersList';
import apiClient from '../lib/api';

// Client-side API function
async function fetchFreightOffers(): Promise<FreightOffer[]> {
  try {
    const response = await apiClient.getFreightOffers();

    const payload = (response.data as { payload?: FreightOffer[] })?.payload || [];
    return payload;
  } catch (err) {
    console.error('Failed to fetch freight offers:', err);
    return [];
  }
}

export default function FreightOffersContainer() {
  const [offers, setOffers] = useState<FreightOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data function
  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const offers = await fetchFreightOffers();
      setOffers(offers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch freight offers');
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Listen for refresh events
  useEffect(() => {
    const handleRefresh = () => {
      loadData();
    };

    window.addEventListener('refresh-freight-offers', handleRefresh);
    return () => window.removeEventListener('refresh-freight-offers', handleRefresh);
  }, []);

  if (loading) {
    return (
      <div className="rounded-md border bg-white">
        <div className="p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 bg-red-50 p-4 rounded-lg border border-red-200 inline-block">
          <p className="font-medium">Failed to load freight offers</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">
          <p className="text-lg font-medium">No freight offers found</p>
          <p className="text-sm mt-2">
            Generate some freight offers or check your TIMOCOM connection
          </p>
        </div>
      </div>
    );
  }

  return <FreightOffersList offers={offers} />;
}
