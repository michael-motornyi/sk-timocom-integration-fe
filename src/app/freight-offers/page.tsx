import { Suspense } from 'react';
import PageHeader from '@/components/PageHeader';
import FreightOffersListControls from '@/components/FreightOffersListControls';
import FreightOffersContainer from '@/components/FreightOffersContainer';

export default function FreightOffersPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <PageHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Card */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <Suspense
            fallback={
              <div className="relative overflow-hidden bg-linear-to-br from-white via-gray-50 to-gray-100 border-0 shadow-xl rounded-lg">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg">
                      <div className="h-5 w-5 bg-white/20 rounded animate-pulse"></div>
                    </div>
                    <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex gap-2 pt-4">
                    <div className="h-9 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-9 w-28 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            }
          >
            <FreightOffersListControls />
          </Suspense>
        </div>

        {/* Freight Offers Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Freight Offers</h2>
          <Suspense
            fallback={
              <div className="rounded-md border bg-white">
                <div className="p-4">
                  {/* Table Header Skeleton */}
                  <div className="flex items-center space-x-4 pb-4 border-b">
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse ml-auto"></div>
                  </div>
                  {/* Table Rows Skeleton */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-4 py-4 border-b border-gray-100"
                    >
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-5 w-14 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="flex space-x-2 ml-auto">
                        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
          >
            <FreightOffersContainer />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
