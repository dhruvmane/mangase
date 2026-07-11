import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, uuid, timestamp, jsonb, numeric, unique, index } from 'drizzle-orm/pg-core';

// user default config:
export const userBaseConfig = JSON.stringify(
	{
		APP_SETTINGS: {
			DARK_MODE: "ENABLED",
			THEME: "Mangase"
		},
		CONTENT_SETTINGS: {
			NSFW_DISPLAY: "PARTIALLY_COVERED",
			SCROLLING_BEHAVIOR: "TOPDOWN"
		},
		ACCOUNT_STATUS: {
			VISIBILITY: "PUBLIC",
			MANGA_LIST_VISIBLE: true,
			REVIEWS_VISIBLE: true,
			COMMENTS_VISIBLE: true
		}
	}
)

// Store Users
export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	description: text("description"),
	profilePicURL: text("profile_pic").unique(),
	profilePicKey: text("profile_pic_key").unique(),
	password_hash: text("password_hash").notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
	userConfig: jsonb("user_config").notNull().default(userBaseConfig)
})

// Database Table to store Session Tokens
export const sessions = pgTable("sessions", {
	id: text("id").primaryKey(),
	userId: uuid("user_id").notNull().references(() => users.id, {onDelete: 'cascade'}),
	expiresAt: timestamp("expires_at", {withTimezone: true}).notNull()
})

export const friendRequestStatusEnum = pgEnum("status_enum", [
	"PENDING",
	"ACCEPTED",
	"IGNORED" // When Ignored, remove the "notification" from recipient, but keep showing as pending for sender.
])

// Friends List
export const friends = pgTable("friends", {
	userId: uuid("user_id").notNull().references(() => users.id, {onDelete: "cascade"}),
	friendId: uuid("friend_id").notNull().references(() => users.id, {onDelete: "cascade"}),
	requestStatus: friendRequestStatusEnum("request_status").notNull().default("PENDING"),
	requestCreatedAt: timestamp("request_created_at").defaultNow(),
	acceptedAt: timestamp("accepted_at")
})

export const mangaStatusEnum = pgEnum("manga_status", [
	"ONGOING",
	"COMPLETED",
	"HIATUS",
	"CANCELLED"
])

// Mangas
export const mangas = pgTable("mangas", {
	id: uuid("id").primaryKey().notNull().unique(),
	authorId: uuid("user_id").notNull(),
	publisherId: uuid("publisher_id").notNull(),
	title: text("title").notNull(),
	altTitles: jsonb("altTitles"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
	externalSources: jsonb("external_sources")
})

// 
export const mangaReadingStatusEnum = pgEnum("list_status", [
	"COMPLETED",
	"READING",
	"PLAN_TO_READ",
	"ON_HOLD",
	"DROPPED"
])
// 
export const reviewSemanticSummary = pgEnum("semantic_summary", [
	"RECOMMENDED",
	"MIXED_FEELINGS",
	"NOT_RECOMMENDED"
])
// 
// Manga Reviews
export const reviews = pgTable("reviews", {
	createdAt: timestamp("created_at").defaultNow(),
	lastEditedAt: timestamp("last_edited_at").defaultNow(),
	id: uuid("id").notNull().primaryKey(),
	mangaId: uuid("manga_id").notNull().references(() => mangas.id, {onDelete:"cascade"}),
	criticId: uuid("critic_id").notNull().references(() => users.id, {onDelete: "cascade"}),
	score: numeric("score").notNull(),
	semanticSummary: reviewSemanticSummary("semantic_summary").notNull(),
	reviewHeading: text("review_heading").notNull(),
	reviewDescription: text("review_description").notNull()
})
// 
// Chapter Comments
export const comments: any = pgTable("comments", {
	createdAt: timestamp("created_at").defaultNow(),
	lastEditedAt: timestamp("last_edited_at").defaultNow(),
	id: uuid("id").notNull().primaryKey(),
	mangaId: uuid("manga_id").notNull().references(() => mangas.id, {onDelete:"cascade"}),
	userId: uuid("critic_id").notNull().references(() => users.id, {onDelete: "cascade"}),
	score: numeric("score").notNull(),
	comment: text("review_description").notNull(),
	likes: numeric("likes").notNull().default('0'),
	dislikes: numeric("dislikes").notNull().default('0'),
	repliesCount: numeric("replies_count").notNull().default('0'),
	replyTo: uuid("reply_to").references(() => comments.id, {onDelete: "cascade"})
})

// User's Manga List:
export const userMangaList = pgTable("user_manga_list", {
	id: uuid("id").primaryKey().notNull(),
	userId: uuid("user_id").notNull().references(() => users.id, {onDelete: "cascade"}),
	mangaId: uuid("manga_id").notNull().references(() => mangas.id, {onDelete: "cascade"}),
	status: mangaReadingStatusEnum("reading_status").notNull().default("PLAN_TO_READ"),
	score: numeric("score"),
	addedAt: timestamp("added_at").defaultNow().notNull(),
	lastUpdatedAt: timestamp("last_updated_at").defaultNow().notNull()
}, (table) => ({
	userMangaUnique: unique("user_manga_unique").on(
		table.userId,
		table.mangaId
	),
	userStatusIdx: index("user_status_idx").on(table.userId, table.mangaId)
}))
// 
// 
export const mangasRelations = relations(mangas, ({ many }) => ({
	listEntries: many(userMangaList),
}));
// 
export const userMangaListRelations = relations(userMangaList, ({ one }) => ({
	user: one(users, {
		fields: [userMangaList.userId],
		references: [users.id],
	}),
  	manga: one(mangas, {
		fields: [userMangaList.mangaId],
		references: [mangas.id],
	}),
}));