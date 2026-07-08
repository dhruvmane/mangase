import { pgTable, serial, integer, text, uuid, timestamp } from 'drizzle-orm/pg-core';

export const task = pgTable('task', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1)
});

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	password_hash: text("password_hash").notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})
