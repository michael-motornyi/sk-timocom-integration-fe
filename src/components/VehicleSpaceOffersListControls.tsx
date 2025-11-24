import { Card, CardContent } from '@/components/ui/card';
import { getVehicleSpaceOffers } from '@/lib/server-api';
import { Truck } from 'lucide-react';
import type { VehicleSpaceOffer } from '@/types';
import VehicleSpaceOffersActions from '@/components/VehicleSpaceOffersActions';

export default async function VehicleSpaceOffersListControls() {
  let vehicleSpaceOffers: VehicleSpaceOffer[] = [];
  let error: string | null = null;

  try {
    const vehicleResult = await getVehicleSpaceOffers({ limit: 100 });

    // Handle both direct array and payload wrapper formats
    vehicleSpaceOffers = Array.isArray(vehicleResult.data)
      ? vehicleResult.data
      : (vehicleResult.data as { payload?: VehicleSpaceOffer[] })?.payload || [];
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch vehicle space offers';
    console.error('Failed to fetch vehicle space offers:', err);
  }

  return (
    <Card className="relative overflow-hidden bg-linear-to-br from-white via-gray-50 to-gray-100 border shadow-sm">
      <div className="absolute inset-0 bg-linear-to-br from-green-50/20 via-transparent to-blue-50/20"></div>
      <CardContent className="relative p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-linear-to-br from-green-500 to-blue-600 rounded-md shadow-md">
              <Truck className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-medium text-gray-900">
              Vehicle Space Offers: {vehicleSpaceOffers.length}
            </span>
            {error && <span className="text-red-600 text-xs ml-2">Error: {error}</span>}
          </div>
          <VehicleSpaceOffersActions hasOffers={vehicleSpaceOffers.length > 0} />
        </div>
      </CardContent>
    </Card>
  );
}
