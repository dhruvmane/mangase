import crypto from 'node:crypto';
import { db } from "./db";
import { sessions } from "./db/schema"; 

// in milliseconds.
const SESSION_DURATION = 1000 * 60 * 60 * 24 * 30; // 30 days of session duration.

export function generateSessionToken(): string {
     return crypto.randomBytes(32).toString('hex');
}

export async function createSession(userId: string) {
     const token = generateSessionToken()
     const expiresAt = new Date(Date.now() + SESSION_DURATION)

     await db.insert(sessions).values({
          userId,
          id: token,
          expiresAt
     })

     return { token, expiresAt }
}