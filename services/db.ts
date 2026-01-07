import { ArchiveImage } from '../types';

const DB_NAME = 'EsbekahhSecureDB';
const DB_VERSION = 1;
const STORE_ARCHIVES = 'archives';
const STORE_FILES = 'file_storage';

class SecureDatabase {
  private db: IDBDatabase | null = null;

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = () => reject("Failed to connect to secure storage.");
      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_ARCHIVES)) {
          db.createObjectStore(STORE_ARCHIVES, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORE_FILES)) {
          db.createObjectStore(STORE_FILES, { keyPath: 'id' });
        }
      };
    });
  }

  async insertArchive(archive: ArchiveImage, originalBlob: Blob, thumbnailBlob: Blob): Promise<void> {
    if (!this.db) await this.connect();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_ARCHIVES, STORE_FILES], 'readwrite');
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject("Transaction failed");
      const archiveStore = transaction.objectStore(STORE_ARCHIVES);
      const fileStore = transaction.objectStore(STORE_FILES);
      const archiveRecord = { ...archive, url: '', thumbnailUrl: '' }; 
      archiveStore.add(archiveRecord);
      fileStore.add({ id: `thumb_${archive.id}`, blob: thumbnailBlob });
      fileStore.add({ id: `orig_${archive.id}`, blob: originalBlob });
    });
  }

  async deleteArchive(id: string | number): Promise<void> {
    if (!this.db) await this.connect();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_ARCHIVES, STORE_FILES], 'readwrite');
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject("Delete transaction failed");
      const archiveStore = transaction.objectStore(STORE_ARCHIVES);
      const fileStore = transaction.objectStore(STORE_FILES);
      archiveStore.delete(id);
      fileStore.delete(`thumb_${id}`);
      fileStore.delete(`orig_${id}`);
    });
  }

  async getAllArchives(): Promise<ArchiveImage[]> {
    if (!this.db) await this.connect();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_ARCHIVES, STORE_FILES], 'readonly');
      const archiveStore = transaction.objectStore(STORE_ARCHIVES);
      const fileStore = transaction.objectStore(STORE_FILES);
      const request = archiveStore.getAll();
      request.onsuccess = async () => {
        const archives = request.result as ArchiveImage[];
        const hydratedArchives = await Promise.all(archives.map(async (arch) => {
          const thumbBlob = await this.getFile(fileStore, `thumb_${arch.id}`);
          const origBlob = await this.getFile(fileStore, `orig_${arch.id}`);
          let thumbnailUrl = '';
          let url = '';
          try {
            if (thumbBlob && thumbBlob.size > 0) thumbnailUrl = URL.createObjectURL(thumbBlob);
            if (origBlob && origBlob.size > 0) url = URL.createObjectURL(origBlob);
          } catch (e) { console.error(e); }
          return { ...arch, thumbnailUrl: thumbnailUrl || arch.thumbnailUrl, url: url || arch.url };
        }));
        resolve(hydratedArchives.reverse());
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
