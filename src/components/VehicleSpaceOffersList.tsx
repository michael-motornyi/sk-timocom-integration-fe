'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { VehicleSpaceOffer } from '@/types';
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Trash } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { deleteVehicleSpaceOfferAction } from '@/lib/actions';

interface VehicleSpaceOffersListProps {
  offers: VehicleSpaceOffer[];
}

export default function VehicleSpaceOffersList({ offers }: VehicleSpaceOffersListProps) {
  const [selectedOffer, setSelectedOffer] = useState<VehicleSpaceOffer | null>(null);
  const [deleteOffer, setDeleteOffer] = useState<VehicleSpaceOffer | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get pagination params from URL
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = parseInt(searchParams.get('limit') || '10', 10);

  // Client-side pagination logic
  const totalPages = Math.ceil(offers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOffers = offers.slice(startIndex, endIndex);

  const navigateToPage = (page: number) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      const newUrl = `/vehicle-space?${params.toString()}`;
      router.push(newUrl);
      router.refresh();
    });
  };

  const handleDeleteOffer = (offer: VehicleSpaceOffer) => {
    if (!offer.publicOfferId) return;

    startTransition(async () => {
      const result = await deleteVehicleSpaceOfferAction(offer.publicOfferId!);
      if (result.success) {
        setDeleteOffer(null);
      } else {
        console.error('Delete failed:', result.error);
      }
    });
  };

  return (
    <>
      {/* Offers Table */}
      <div className="rounded-md border bg-white mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle Type</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Available Date</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Length</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOffers.map(offer => {
              return (
                <TableRow key={offer.publicOfferId}>
                  <TableCell>
                    <div className="font-medium">{offer.vehicle?.type || 'N/A'}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{offer.loadingLocation?.city || 'Unknown'}</div>
                      <div className="text-sm text-gray-500">
                        {offer.loadingLocation?.country || ''}
                        {offer.loadingLocation?.postalCode &&
                          ` ${offer.loadingLocation.postalCode}`}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">
                        {offer.unloadingLocation?.city || 'Unknown'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {offer.unloadingLocation?.country || ''}
                        {offer.unloadingLocation?.postalCode &&
                          ` ${offer.unloadingLocation.postalCode}`}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {offer.availableFrom
                        ? new Date(offer.availableFrom).toLocaleDateString('de-DE')
                        : 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {offer.vehicle?.capacity ? `${offer.vehicle.capacity}t` : 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {offer.vehicle?.dimensions?.length
                        ? `${offer.vehicle.dimensions.length}m`
                        : 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">N/A</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        onClick={() => setSelectedOffer(offer)}
                        className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                        title="View Details"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setDeleteOffer(offer)}
                        disabled={isPending}
                        className="bg-red-600 text-white hover:bg-red-700 border-red-600"
                        title="Delete Offer"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10">
          {/* Pagination Container with Glass Effect */}
          <div className="flex justify-center">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl shadow-gray-900/5 p-3">
              <div className="flex items-center gap-1">
                {/* Previous Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToPage(currentPage - 1)}
                  disabled={currentPage <= 1 || isPending}
                  className="h-10 w-10 p-0 rounded-xl hover:bg-linear-to-r hover:from-gray-50 hover:to-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
                >
                  <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
                </Button>

                {/* Page Numbers */}
                {(() => {
                  const pages = [];
                  const showEllipsis = totalPages > 7;

                  if (!showEllipsis) {
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    if (currentPage <= 4) {
                      pages.push(1, 2, 3, 4, 5, '...', totalPages);
                    } else if (currentPage >= totalPages - 3) {
                      pages.push(
                        1,
                        '...',
                        totalPages - 4,
                        totalPages - 3,
                        totalPages - 2,
                        totalPages - 1,
                        totalPages
                      );
                    } else {
                      pages.push(
                        1,
                        '...',
                        currentPage - 1,
                        currentPage,
                        currentPage + 1,
                        '...',
                        totalPages
                      );
                    }
                  }

                  return pages.map((page, index) => {
                    if (page === '...') {
                      return (
                        <div key={`ellipsis-${index}`} className="flex items-center px-2">
                          <div className="flex gap-1">
                            <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
                            <div
                              className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"
                              style={{ animationDelay: '0.2s' }}
                            ></div>
                            <div
                              className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"
                              style={{ animationDelay: '0.4s' }}
                            ></div>
                          </div>
                        </div>
                      );
                    }

                    const isActive = page === currentPage;
                    return (
                      <Button
                        key={page}
                        variant="ghost"
                        size="sm"
                        onClick={() => navigateToPage(page as number)}
                        disabled={isPending}
                        className={`h-10 min-w-10 rounded-xl font-medium transition-all duration-300 ${
                          isActive
                            ? 'bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-105'
                            : 'text-gray-700 hover:bg-linear-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-900 hover:shadow-md hover:scale-105 active:scale-95'
                        } ${isPending ? 'opacity-30 cursor-not-allowed' : ''}`}
                      >
                        {page}
                      </Button>
                    );
                  });
                })()}

                {/* Next Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToPage(currentPage + 1)}
                  disabled={currentPage >= totalPages || isPending}
                  className="h-10 w-10 p-0 rounded-xl hover:bg-linear-to-r hover:from-gray-50 hover:to-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
                >
                  <ChevronRightIcon className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>

          {/* Page Info */}
          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-gray-50 to-gray-100 rounded-full border border-gray-200/50">
              <span className="text-sm font-medium text-gray-600">
                Page <span className="font-semibold text-blue-600">{currentPage}</span> of{' '}
                <span className="font-semibold text-gray-800">{totalPages}</span>
              </span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">{offers.length}</span> total offers
              </span>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {selectedOffer && (
        <Modal
          isOpen={!!selectedOffer}
          onClose={() => setSelectedOffer(null)}
          title="Vehicle Space Offer Details"
        >
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block text-sm font-medium text-gray-700">Public Offer ID</label>
                <p className="mt-1 text-sm text-gray-900">{selectedOffer.publicOfferId || 'N/A'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                <p className="mt-1 text-sm text-gray-900">{selectedOffer.vehicle?.type || 'N/A'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Max Weight</label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedOffer.vehicle?.capacity ? `${selectedOffer.vehicle.capacity}t` : 'N/A'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Max Length</label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedOffer.vehicle?.dimensions?.length
                    ? `${selectedOffer.vehicle.dimensions.length}m`
                    : 'N/A'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Available From</label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedOffer.availableFrom
                    ? new Date(selectedOffer.availableFrom).toLocaleDateString('de-DE')
                    : 'N/A'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <Badge variant="secondary" className="mt-1">
                  {selectedOffer.status || 'Unknown'}
                </Badge>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Loading Location</label>
              <div className="mt-1 p-2 bg-gray-50 rounded text-sm">
                <div className="font-medium">
                  {selectedOffer.loadingLocation?.city}, {selectedOffer.loadingLocation?.country}
                </div>
                {selectedOffer.loadingLocation?.postalCode && (
                  <div className="text-gray-600">{selectedOffer.loadingLocation.postalCode}</div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Destination Location
              </label>
              <div className="mt-1 p-2 bg-gray-50 rounded text-sm">
                <div className="font-medium">
                  {selectedOffer.unloadingLocation?.city},{' '}
                  {selectedOffer.unloadingLocation?.country}
                </div>
                {selectedOffer.unloadingLocation?.postalCode && (
                  <div className="text-gray-600">{selectedOffer.unloadingLocation.postalCode}</div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setSelectedOffer(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteOffer && (
        <Modal
          isOpen={!!deleteOffer}
          onClose={() => !isPending && setDeleteOffer(null)}
          title="Delete Vehicle Space Offer"
        >
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-gray-900 mb-2">
                Are you sure you want to delete this vehicle space offer?
              </p>
              <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                <strong>ID:</strong> {deleteOffer.publicOfferId}
                <br />
                <strong>Vehicle:</strong> {deleteOffer.vehicle?.type || 'N/A'}
              </p>
              <p className="text-xs text-gray-500 mt-2">This action cannot be undone.</p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setDeleteOffer(null)} disabled={isPending}>
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteOffer(deleteOffer)}
                disabled={isPending}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                {isPending ? (
                  <>
                    <Trash className="h-4 w-4 mr-2" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete Offer
                  </>
                )}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
