import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, uuid, timestamp, jsonb, numeric, unique, index, boolean } from 'drizzle-orm/pg-core';

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

// Store Creators [WRITERS/ARTISTS/PUBLISHERS/TRANSLATORS]
export const creatorContributionEnum = pgEnum("creator_contribution", [
	"WRITER",
	"ARTIST",
	"ARTIST_&_WRITER",
	"PUBLISHER",
	"TRANSLATOR"
])

export const creators = pgTable("creators", {})

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
	id: uuid("id").primaryKey().notNull().unique(),											// Unique Manga ID
	mangaSlug: text("manga_slug").notNull().unique(),											// Unique Text Slug
	authorDetails: jsonb("author_details"),													// List of Authors who worked on it.
	publisherDetails: jsonb("publisher_details"),											// List of Publishers who published the comic.
	title: text("title").notNull(),														// English Title
	altTitles: jsonb("altTitles"),														// List of all alternate titles.
	createdAt: timestamp("created_at").defaultNow().notNull(),									// Date of First Publishing of Manga
	updatedAt: timestamp("updated_at").defaultNow().notNull(),									// Date of Latest Chapter Upload
	mangaStatus: mangaStatusEnum("manga_status").notNull().default("ONGOING"),						// MANGA STATUS — ONGOING/CANCELLED ETC
	mangaDexMangaId: text("manga_dex_id"),						
	mangaCover: text("manga_cover")
})

// Manga Chapters
export const chapters = pgTable("chapters", {
	id: uuid("id").primaryKey().notNull().unique(),											// Chapter ID
	mangaId: uuid("id").notNull().references(() => mangas.id, {onDelete: "cascade"}),				// Store Manga ID (for referencing)
	chapterTitle: text("chapter_title"),													// Store Chapter Number
	chapterNumber: numeric("chapter_number").notNull(),										// Store Chapter Number
	chapterSource: jsonb("chapter_source").default({data_saver:{}, highest_quality:{}}),				// Store Scraped Chapter Links
	chapterLanguage: text("chapter_language"),												// Store Chapter Language
	publisherInfo: jsonb("publisher_info"),													// Store Information about Chapter Source (Who Provided Chapters?)
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

// Chapter Comments
export const comments: any = pgTable("comments", {
	createdAt: timestamp("created_at").defaultNow(),
	lastEditedAt: timestamp("last_edited_at").defaultNow(),
	id: uuid("id").notNull().primaryKey(),
	mangaId: uuid("manga_id").references(() => mangas.id, {onDelete:"cascade"}),
	chapterId: uuid("chapter_id").references(() => chapters.id, {onDelete:"cascade"}),
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



// BETTER-AUTH
export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull()
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull().references(() => user.id)
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull().references(() => user.id),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull()
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at")
});

