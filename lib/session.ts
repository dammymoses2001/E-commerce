import { v4 as uuidv4 } from "uuid"

export class SessionManager {
  private static SESSION_KEY = "ecommerce_session_id"

  static getSessionId(): string {
    if (typeof window === "undefined") return ""

    let sessionId = localStorage.getItem(this.SESSION_KEY)

    if (!sessionId) {
      sessionId = this.generateSessionId()
      localStorage.setItem(this.SESSION_KEY, sessionId)
    }

    return sessionId
  }

  private static generateSessionId(): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2)
    const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : ""
    const platform = typeof navigator !== "undefined" ? navigator.platform : ""

    // Create a unique session based on system info
    const systemInfo = `${userAgent}-${platform}-${timestamp}-${random}`
    return uuidv4() + "-" + btoa(systemInfo).substring(0, 8)
  }

  static clearSession(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.SESSION_KEY)
    }
  }
}
