
export interface UserSession {
  agentId: string;
  isAuthenticated: boolean;
  timestamp: number;
}

export interface ArchiveImage {
  id: string;
  url: string; // The High-Res Original
  thumbnailUrl: string; // The Compressed ~20kb version
  timestamp: string;
  clearanceLevel: 'TOP SECRET' | 'CLASSIFIED' | 'RESTRICTED';
  name: string;
  description?: string;
  fileName: string; // e.g. "mission_01.jpg"
  virtualPath: string; // e.g. "/server/secure/uploads/"
}

export type ViewState = 'LANDING' | 'LOGIN' | 'DASHBOARD';
