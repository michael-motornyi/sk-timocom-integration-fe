'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Truck, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    name: 'Freight Offers',
    href: '/freight-offers',
    icon: Package,
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    name: 'Vehicle Space',
    href: '/vehicle-space',
    icon: Truck,
    gradient: 'from-green-500 to-blue-600',
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="mb-8">
      <div className="grid grid-cols-2 gap-4">
        {navigationItems.map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative overflow-hidden bg-linear-to-br from-white via-gray-50 to-gray-100 border-0 shadow-xl rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105',
                isActive && 'ring-2 ring-offset-2 ring-blue-500'
              )}
            >
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <div className={cn('p-2 bg-linear-to-br rounded-lg', item.gradient)}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.name === 'Freight Offers'
                        ? 'Manage cargo shipments and freight offers'
                        : 'Manage vehicle space and transport capacity'}
                    </p>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/5 to-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
