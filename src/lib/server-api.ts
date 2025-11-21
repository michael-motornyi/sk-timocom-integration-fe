import type {
  ApiResponse,
  FreightOffer,
  PaginatedResponse,
  PaginationParams,
  TestConnectionResponse,
} from '@/types';
import { cache } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Server-side API functions with React cache
const request = cache(async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    next: {
      revalidate: 30, // Revalidate every 30 seconds
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error instanceof Error ? error.message : 'Network error occurred', 0);
  }
});

// Server-side cached API functions
export const getConnectionStatus = cache(async (): Promise<TestConnectionResponse> => {
  return request<TestConnectionResponse>('/api/timocom/test');
});

export const getFreightOffers = cache(
  async (params: PaginationParams = {}): Promise<PaginatedResponse<FreightOffer>> => {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.limit) searchParams.set('limit', params.limit.toString());
    if (params.status) searchParams.set('status', params.status);

    const query = searchParams.toString();
    const endpoint = `/api/timocom/freight-offers${query ? `?${query}` : ''}`;

    return request<PaginatedResponse<FreightOffer>>(endpoint);
  }
);

export const getFreightOffer = cache(
  async (publicOfferId: string): Promise<ApiResponse<FreightOffer>> => {
    return request<ApiResponse<FreightOffer>>(`/api/timocom/freight-offers/${publicOfferId}`);
  }
);

// Client-side API class for mutations (actions that modify data)
class ClientApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.error || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          data
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(error instanceof Error ? error.message : 'Network error occurred', 0);
    }
  }

  // Mutation methods (client-side only)
  async deleteFreightOffer(publicOfferId: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/api/timocom/freight-offers/${publicOfferId}`, {
      method: 'DELETE',
    });
  }

  async deleteAllFreightOffers(): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>('/api/timocom/freight-offers/delete-all', {
      method: 'POST',
      body: JSON.stringify({ confirm: true }),
    });
  }

  async generateFreightOffers(params: { count: number }): Promise<ApiResponse<FreightOffer[]>> {
    return this.request<ApiResponse<FreightOffer[]>>('/api/generate/freight', {
      method: 'POST',
      body: JSON.stringify({ count: params.count }),
    });
  }

  async refreshData(): Promise<void> {
    // Trigger revalidation by making a request with cache-busting
    return this.request<void>('/api/timocom/test?' + Date.now());
  }
}

// Export both server and client APIs
export const clientApi = new ClientApiClient();

// Legacy client API for backwards compatibility
export const apiClient = clientApi;
