import { Card, CardContent } from '@/components/ui/card';
import { getFreightOffers } from '@/lib/server-api';
import { Package } from 'lucide-react';
import type { FreightOffer } from '@/types';
import FreightOffersActions from '@/components/FreightOffersActions';

export default async function FreightOffersListControls() {
  let freightOffers: FreightOffer[] = [];
  let error: string | null = null;

  try {
    const freightResult = await getFreightOffers({ limit: 100 });

    // Handle both direct array and payload wrapper formats
    freightOffers = Array.isArray(freightResult.data)
      ? freightResult.data
      : (freightResult.data as { payload?: FreightOffer[] })?.payload || [];
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch freight offers';
    console.error('Failed to fetch freight offers:', err);
  }

  return (
    <Card className="relative overflow-hidden bg-linear-to-br from-white via-gray-50 to-gray-100 border shadow-sm">
      <div className="absolute inset-0 bg-linear-to-br from-blue-50/20 via-transparent to-purple-50/20"></div>
      <CardContent className="relative p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-linear-to-br from-blue-500 to-purple-600 rounded-md shadow-md">
              <Package className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold text-gray-900">
              Freight Offers: {freightOffers.length}
            </span>
            {error && <span className="text-red-600 text-xs ml-2">Error: {error}</span>}
          </div>
          <FreightOffersActions hasOffers={freightOffers.length > 0} />
        </div>
      </CardContent>
    </Card>
  );
}
