import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-8">
          <div className="h-10 w-80 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 w-96 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
        </div>

        {/* Connection Status Skeleton */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-3">
              <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
              <span className="text-gray-600">Loading TIMOCOM connection status...</span>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
          <Card className="relative overflow-hidden bg-linear-to-br from-white via-gray-50 to-gray-100 border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
                  <div className="h-5 w-5 bg-white/20 rounded animate-pulse"></div>
                </div>
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>

                {/* Action buttons skeleton */}
                <div className="flex flex-wrap gap-2 pt-4">
                  <div className="h-9 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-9 w-28 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-9 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Offers Table Skeleton */}
        <div className="rounded-md border bg-white">
          <div className="p-4">
            {/* Table Header Skeleton */}
            <div className="flex items-center space-x-4 pb-4 border-b mb-4">
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
              <div key={i} className="flex items-center space-x-4 py-4 border-b border-gray-100">
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

        {/* Pagination Skeleton */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          <div className="h-9 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-9 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
