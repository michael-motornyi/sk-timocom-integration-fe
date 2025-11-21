// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string;
}

// Freight Offer Types
export interface FreightOffer {
  id: string;
  publicOfferId?: string;
  freightDescription: string;
  length_m: number;
  weight_t: number;
  loadingPlaces: LoadingPlace[];
  contactPerson: ContactPerson;
  vehicleProperties: VehicleProperties;
  trackable: boolean;
  acceptQuotes: boolean;
  status?: 'active' | 'inactive' | 'expired' | 'completed';
  price?: Money;
  paymentDueWithinDays?: number;
  distance_km?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoadingPlace {
  loadingType: 'LOADING' | 'UNLOADING';
  address: Address;
  startTime?: string;
  endTime?: string;
  earliestLoadingDate: string;
  latestLoadingDate: string;
}

export interface Address {
  objectType: string;
  country: string;
  city: string;
  postalCode?: string;
  geoCoordinate?: {
    longitude: number;
    latitude: number;
  };
  geocoded?: boolean;
}

export interface ContactPerson {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  languages: string[];
  businessPhone?: string;
  mobilePhone?: string;
  fax?: string;
}

export interface VehicleProperties {
  body: string[];
  bodyProperty?: string[];
  equipment?: string[];
  loadSecuring?: string[];
  swapBody?: string[];
  type: string[];
}

export interface Money {
  amount: number;
  currency: string;
}

export interface CreateFreightOfferRequest {
  loadingDate: string;
  unloadingDate: string;
  loadingLocation: Location;
  unloadingLocation: Location;
  freight: Freight;
  transport: Transport;
  contact: Contact;
}

// Vehicle Space Offer Types
export interface VehicleSpaceOffer {
  publicOfferId: string;
  status: 'active' | 'inactive' | 'expired' | 'completed';
  availableFrom: string;
  availableTo: string;
  loadingLocation: Location;
  unloadingLocation: Location;
  vehicle: Vehicle;
  contact: Contact;
  createdAt?: string;
  updatedAt?: string;
}

export interface PublishVehicleSpaceOfferRequest {
  availableFrom: string;
  availableTo: string;
  loadingLocation: Location;
  unloadingLocation: Location;
  vehicle: Vehicle;
  contact: Contact;
}

// Common Types
export interface Location {
  country: string;
  postalCode: string;
  city: string;
  address?: string;
}

export interface Freight {
  description: string;
  weight: number;
  volume?: number;
  dimensions?: Dimensions;
  hazardous?: boolean;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface Transport {
  vehicleType: string;
  price?: number;
  currency?: string;
  paymentTerms?: string;
}

export interface Vehicle {
  type: string;
  capacity: number;
  dimensions?: Dimensions;
  features?: string[];
}

export interface Contact {
  name: string;
  phone: string;
  email?: string;
  company?: string;
}

// Pagination Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  status?: 'active' | 'inactive' | 'expired' | 'completed';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// API Test Response
export interface TestConnectionResponse {
  success: boolean;
  message: string;
  timestamp: string;
}
