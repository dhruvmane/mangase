import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';

// Store Users
export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	profilePicURL: text("profile_pic").unique(),
	password_hash: text("password_hash").notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// Database Table to store Session Tokens
export const sessions = pgTable("sessions", {
	id: text("id").primaryKey(),
	userId: uuid("user_id").notNull().references(() => users.id, {onDelete: 'cascade'}),
	expiresAt: timestamp("expires_at", {withTimezone: true}).notNull()
})