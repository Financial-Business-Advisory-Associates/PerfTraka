import { ApiUrls, apiBaseUrl } from '@/constants/ApiUrl';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

export async function isNetworkAvailableUtil() {
  try {
    let response = await fetch(apiBaseUrl + ApiUrls.testNetworkConnection, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return true;
    }
  } catch (error: any) {
    if (
      error.message === 'Timeout' ||
      error.message === 'Network request failed'
    ) {
      return false;
    }
  }

  return false;
}
