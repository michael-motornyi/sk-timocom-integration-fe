'use server';

import { revalidatePath } from 'next/cache';
import { clientApi } from '@/lib/server-api';

export async function deleteFreightOfferAction(id: string) {
  try {
    await clientApi.deleteFreightOffer(id);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete freight offer:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete offer',
    };
  }
}

export async function deleteAllFreightOffersAction() {
  try {
    await clientApi.deleteAllFreightOffers();
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete all freight offers:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete all offers',
    };
  }
}

export async function generateFreightOffersAction(count: number) {
  try {
    const result = await clientApi.generateFreightOffers({ count });
    revalidatePath('/');
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to generate freight offers:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate offers',
    };
  }
}

export async function refreshDataAction() {
  try {
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to refresh data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to refresh data',
    };
  }
}
