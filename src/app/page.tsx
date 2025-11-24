import PageHeader from '@/components/PageHeader';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <PageHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">TIMOCOM Integration</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manage your freight offers and vehicle space offers efficiently. Choose a section below
            to get started with your logistics operations.
          </p>
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="relative overflow-hidden bg-linear-to-br from-white via-gray-50 to-gray-100 border-0 shadow-xl rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg">
                  <div className="h-5 w-5 bg-white/80 rounded"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Freight Management</h3>
              </div>
              <p className="text-gray-600">
                Track and manage cargo shipments, delivery routes, and freight offers with
                comprehensive tools for logistics operations.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden bg-linear-to-br from-white via-gray-50 to-gray-100 border-0 shadow-xl rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-linear-to-br from-green-500 to-blue-600 rounded-lg">
                  <div className="h-5 w-5 bg-white/80 rounded"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Vehicle Space</h3>
              </div>
              <p className="text-gray-600">
                Optimize vehicle capacity utilization, manage transport space offers, and coordinate
                vehicle logistics efficiently.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
