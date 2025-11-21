import { getConnectionStatus } from '@/lib/server-api';

export default async function ConnectionStatus() {
  let connectionStatus = 'Unknown';

  try {
    const result = await getConnectionStatus();
    connectionStatus = result.success ? 'Connected' : 'Failed';
  } catch (error) {
    connectionStatus = 'Error';
    console.error('Connection test failed:', error);
  }

  const getDotColor = () => {
    switch (connectionStatus) {
      case 'Connected':
        return 'bg-green-500';
      case 'Failed':
      case 'Error':
        return 'bg-red-500';
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
