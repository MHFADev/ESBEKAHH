
import { ArchiveImage } from '../types';

const DB_NAME = 'EsbekahhSecureDB';
const DB_VERSION = 1;
const STORE_ARCHIVES = 'archives';
const STORE_FILES = 'file_storage';

// Database Interface mimicking a backend ORM
class SecureDatabase {
  private db: IDBDatabase | null = null;

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error("Database connection failed");
        reject("Failed to connect to secure storage.");
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        console.log("Secure Database Connected.");
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Table for Metadata (JSON)
        if (!db.objectStoreNames.contains(STORE_ARCHIVES)) {
          db.createObjectStore(STORE_ARCHIVES, { keyPath: 'id' });
        }

        // Table for Binary Blobs (Images)
        if (!db.objectStoreNames.contains(STORE_FILES)) {
          db.createObjectStore(STORE_FILES, { keyPath: 'id' });
        }
      };
    });
  }

  // INSERT INTO archives ...
  async insertArchive(archive: ArchiveImage, originalBlob: Blob, thumbnailBlob: Blob): Promise<void> {
    if (!this.db) await this.connect();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_ARCHIVES, STORE_FILES], 'readwrite');
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject("Transaction failed");

      // 1. Store the Metadata (with placeholder URLs)
      const archiveStore = transaction.objectStore(STORE_ARCHIVES);
      const fileStore = transaction.objectStore(STORE_FILES);

      // We don't store DataURLs in the 'archives' table because they are too big (JSON string limit).
      // We store them in a separate binary table.
      const archiveRecord = { ...archive, url: '', thumbnailUrl: '' }; 
      archiveStore.add(archiveRecord);

      // 2. Store the Binary Files
      fileStore.add({ id: `thumb_${archive.id}`, blob: thumbnailBlob });
      fileStore.add({ id: `orig_${archive.id}`, blob: originalBlob });
    });
  }

  // SELECT * FROM archives
  async getAllArchives(): Promise<ArchiveImage[]> {
    if (!this.db) await this.connect();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_ARCHIVES, STORE_FILES], 'readonly');
      const archiveStore = transaction.objectStore(STORE_ARCHIVES);
      const fileStore = transaction.objectStore(STORE_FILES);

      const request = archiveStore.getAll();
      
      request.onsuccess = async () => {
        const archives = request.result as ArchiveImage[];
        
        // Hydrate the data: Fetch blobs and create ObjectURLs
        const hydratedArchives = await Promise.all(archives.map(async (arch) => {
          const thumbBlob = await this.getFile(fileStore, `thumb_${arch.id}`);
          const origBlob = await this.getFile(fileStore, `orig_${arch.id}`);

          return {
            ...arch,
            thumbnailUrl: thumbBlob ? URL.createObjectURL(thumbBlob) : '',
            url: origBlob ? URL.createObjectURL(origBlob) : ''
          };
        }));
        
        resolve(hydratedArchives.reverse()); // Show newest first
      };

      request.onerror = () => reject("Query failed");
    });
  }

  private getFile(store: IDBObjectStore, id: string): Promise<Blob | null> {
    return new Promise((resolve) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result?.blob || null);
      request.onerror = () => resolve(null);
    });
  }
}

export const dbService = new SecureDatabase();
