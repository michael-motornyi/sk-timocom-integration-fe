import type {
  ApiResponse,
  FreightOffer,
  PaginatedResponse,
  PaginationParams,
  TestConnectionResponse,
} from '@/types';

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

class ApiClient {
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

  // Test TIMOCOM connection
  async testConnection(): Promise<TestConnectionResponse> {
    return this.request<TestConnectionResponse>('/api/timocom/test');
  }

  // Freight Offers API
  async getFreightOffers(params: PaginationParams = {}): Promise<PaginatedResponse<FreightOffer>> {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.limit) searchParams.set('limit', params.limit.toString());
    if (params.status) searchParams.set('status', params.status);

    const query = searchParams.toString();
    const endpoint = `/api/timocom/freight-offers${query ? `?${query}` : ''}`;

    return this.request<PaginatedResponse<FreightOffer>>(endpoint);
  }

  async getFreightOffer(publicOfferId: string): Promise<ApiResponse<FreightOffer>> {
    return this.request<ApiResponse<FreightOffer>>(`/api/timocom/freight-offers/${publicOfferId}`);
  }

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
}

// Export singleton instance
export const apiClient = new ApiClient();
export { ApiError };
export default apiClient;
