import { ArchiveImage } from '../types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const API_BASE = `${SUPABASE_URL}/functions/v1`;

class APIService {
  private async fetchAPI(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${API_BASE}/${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || 'API request failed');
    }

    return response.json();
  }

  async initDatabase(): Promise<void> {
    await this.fetchAPI('init-db', { method: 'POST' });
  }

  async uploadImage(data: {
    name: string;
    description: string;
    fileName: string;
    clearanceLevel: string;
    thumbnailData: string;
    originalData: string;
    uploaderId: string;
  }): Promise<{ success: boolean; id: string }> {
    return this.fetchAPI('upload-image', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getImages(): Promise<ArchiveImage[]> {
    const result = await this.fetchAPI('get-images');
    const images = result.images || [];
    
    // Ensure that for the visitor, the 'url' (HD) is actually present
    // If Supabase only returns certain fields, we might need to ensure the HD field is mapped
    return images.map((img: any) => ({
      ...img,
      // If the backend returns a different field name for HD, map it here
      url: img.url || img.originalData || img.thumbnailUrl 
    }));
  }

  async getFullImage(id: string): Promise<string> {
    const result = await this.fetchAPI(`get-image?id=${id}`);
    return result.url;
  }
}

export const apiService = new APIService();
