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
import type { FreightOffer } from '@/types';
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Trash } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { deleteFreightOfferAction } from '@/lib/actions';

interface FreightOffersListProps {
  offers: FreightOffer[];
}

export default function FreightOffersList({ offers }: FreightOffersListProps) {
  const [selectedOffer, setSelectedOffer] = useState<FreightOffer | null>(null);
  const [deleteOffer, setDeleteOffer] = useState<FreightOffer | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Get pagination params from URL
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = parseInt(searchParams.get('limit') || '10', 10);

  // Client-side pagination logic
  const totalPages = Math.ceil(offers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOffers = offers.slice(startIndex, endIndex);

  const navigateToPage = (page: number) => {
    console.log('Navigating to page:', page);
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      const newUrl = `${pathname}?${params.toString()}`;
      console.log('Navigation URL:', newUrl);
      router.push(newUrl);
      // Force refresh to ensure server components re-render
      router.refresh();
    });
  };

  const formatCurrency = (amount: number, currency: string = 'EUR') => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const handleDeleteOffer = (offer: FreightOffer) => {
    if (!offer.id) return;

    startTransition(async () => {
      const result = await deleteFreightOfferAction(offer.id!);
      if (result.success) {
        setDeleteOffer(null);
      } else {
        // Handle error - could show toast notification
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
              <TableHead>Description</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Loading Date</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Length</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOffers.map(offer => {
              const loadingPlace = offer.loadingPlaces?.[0];
              const unloadingPlace = offer.loadingPlaces?.find(
                place => place.loadingType === 'UNLOADING'
              );
              const fromLocation = loadingPlace
                ? `${loadingPlace.address.city}, ${loadingPlace.address.country}`
                : 'Unknown';
              const toLocation = unloadingPlace
                ? `${unloadingPlace.address.city}, ${unloadingPlace.address.country}`
                : 'Unknown';
              const loadingDate = loadingPlace?.earliestLoadingDate
                ? new Date(loadingPlace.earliestLoadingDate).toLocaleDateString()
                : 'Not specified';

              return (
                <TableRow key={offer.publicOfferId || offer.id}>
                  <TableCell className="max-w-[200px]">
                    <div
                      className="truncate font-medium text-gray-900"
                      title={offer.freightDescription}
                    >
                      {offer.freightDescription || 'Freight Offer'}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[150px]">
                    <div className="truncate text-gray-800" title={fromLocation}>
                      {fromLocation}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[150px]">
                    <div className="truncate text-gray-800" title={toLocation}>
                      {toLocation}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-800">{loadingDate}</TableCell>
                  <TableCell className="font-medium text-gray-900">{offer.weight_t}t</TableCell>
                  <TableCell className="font-medium text-gray-900">{offer.length_m}m</TableCell>
                  <TableCell className="font-semibold text-green-700">
                    {offer.price ? (
                      formatCurrency(offer.price.amount, offer.price.currency)
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        onClick={() => setSelectedOffer(offer)}
                        className="bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"
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
                    // Show all pages if 7 or fewer
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    // Smart pagination for more than 7 pages
                    if (currentPage <= 4) {
                      // Show first 5 pages, ellipsis, last page
                      pages.push(1, 2, 3, 4, 5, '...', totalPages);
                    } else if (currentPage >= totalPages - 3) {
                      // Show first page, ellipsis, last 5 pages
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
                      // Show first, ellipsis, current-1, current, current+1, ellipsis, last
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

          {/* Page Info with Beautiful Typography */}
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
              {isPending && (
                <>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-blue-600 font-medium animate-pulse">Loading</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {selectedOffer && (
        <Modal
          isOpen={!!selectedOffer}
          onClose={() => setSelectedOffer(null)}
          title="Freight Offer Details"
          maxWidth="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Offer ID</label>
                <p className="mt-1 text-sm text-gray-900 font-mono">
                  {selectedOffer.publicOfferId || selectedOffer.id}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <div className="mt-1">
                  <Badge variant={selectedOffer.status === 'active' ? 'default' : 'secondary'}>
                    {selectedOffer.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">From</label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedOffer.loadingPlaces[0]?.address.city},{' '}
                  {selectedOffer.loadingPlaces[0]?.address.country}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">To</label>
                <p className="mt-1 text-sm text-gray-900">
                  {
                    selectedOffer.loadingPlaces.find(p => p.loadingType === 'UNLOADING')?.address
                      .city
                  }
                  ,{' '}
                  {
                    selectedOffer.loadingPlaces.find(p => p.loadingType === 'UNLOADING')?.address
                      .country
                  }
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="mt-1 text-sm text-gray-900">{selectedOffer.freightDescription}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Loading Date</label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedOffer.loadingPlaces[0]?.earliestLoadingDate
                    ? new Date(
                        selectedOffer.loadingPlaces[0].earliestLoadingDate
                      ).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <p className="mt-1 text-sm text-gray-900 font-semibold">
                  {selectedOffer.price
                    ? formatCurrency(selectedOffer.price.amount, selectedOffer.price.currency)
                    : 'N/A'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Weight</label>
                <p className="mt-1 text-sm text-gray-900">{selectedOffer.weight_t} t</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Length</label>
                <p className="mt-1 text-sm text-gray-900">{selectedOffer.length_m} m</p>
              </div>
            </div>

            {selectedOffer.vehicleProperties?.equipment && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Equipment</label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedOffer.vehicleProperties.equipment.join(', ')}
                </p>
              </div>
            )}

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
          title="Delete Freight Offer"
        >
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-gray-900 mb-2">
                Are you sure you want to delete this freight offer?
              </p>
              <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                <strong>ID:</strong> {deleteOffer.publicOfferId || deleteOffer.id}
                <br />
                <strong>Description:</strong> {deleteOffer.freightDescription}
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
