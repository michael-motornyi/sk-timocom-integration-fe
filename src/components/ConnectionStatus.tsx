'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';

export default function ConnectionStatus() {
  const [connectionStatus, setConnectionStatus] = useState<string>('Checking...');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const result = await apiClient.testConnection();
        setConnectionStatus(result.success ? 'Connected' : 'Failed');
      } catch (error) {
        setConnectionStatus('Error');
        console.error('Connection test failed:', error);
      }
    };

    checkConnection();

    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, []);

  const getDotColor = () => {
    switch (connectionStatus) {
      case 'Connected':
        return 'bg-green-500';
      case 'Failed':
      case 'Error':
        return 'bg-red-500';
      case 'Checking...':
        return 'bg-yellow-500 animate-pulse';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-3 h-3 rounded-full ${getDotColor()}`}></div>
      <span className="text-base text-gray-700">{connectionStatus}</span>
    </div>
  );
}
