'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, Truck, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import ConnectionStatus from '@/components/ConnectionStatus';

const navigationItems = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
  },
  {
    name: 'Freight Offers',
    href: '/freight-offers',
    icon: Package,
  },
  {
    name: 'Vehicle Space',
    href: '/vehicle-space',
    icon: Truck,
  },
];

export default function PageHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">TIMOCOM Integration Dashboard</h1>
              <p className="mt-1 text-lg text-gray-600">Freight and Vehicle Space Management</p>
            </div>

            {/* Navigation Buttons */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map(item => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-blue-50 text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center">
            <Suspense
              fallback={
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 bg-yellow-300 rounded-full animate-pulse"></div>
                    <span className="text-sm text-yellow-700">Checking...</span>
                  </div>
                </div>
              }
            >
              <ConnectionStatus />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}
