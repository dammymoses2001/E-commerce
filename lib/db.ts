import type { CartItem } from "./types"

const DB_NAME = "ecommerce-cart"
const DB_VERSION = 1
const STORE_NAME = "cart"

class IndexedDBManager {
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: "sessionId" })
          store.createIndex("sessionId", "sessionId", { unique: true })
        }
      }
    })
  }

  async saveCart(items: CartItem[], sessionId: string): Promise<void> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction([STORE_NAME], "readwrite")
    const store = transaction.objectStore(STORE_NAME)

    const cartData = {
      sessionId,
      items,
      lastUpdated: new Date().toISOString(),
    }

    return new Promise((resolve, reject) => {
      const request = store.put(cartData)
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  async loadCart(sessionId: string): Promise<CartItem[]> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readonly")
      const store = transaction.objectStore(STORE_NAME)
      const request = store.get(sessionId)

      request.onsuccess = () => {
        const result = request.result
        resolve(result ? result.items : [])
      }
      request.onerror = () => reject(request.error)
    })
  }
}

export const dbManager = new IndexedDBManager()
