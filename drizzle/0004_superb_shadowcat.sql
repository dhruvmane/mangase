CREATE TYPE "public"."status_enum" AS ENUM('PENDING', 'ACCEPTED', 'IGNORED');--> statement-breakpoint
CREATE TYPE "public"."list_status" AS ENUM('COMPLETED', 'READING', 'PLAN_TO_READ', 'ON_HOLD', 'DROPPED');--> statement-breakpoint
CREATE TYPE "public"."manga_status" AS ENUM('ONGOING', 'COMPLETED', 'HIATUS', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."semantic_summary" AS ENUM('RECOMMENDED', 'MIXED_FEELINGS', 'NOT_RECOMMENDED');--> statement-breakpoint
CREATE TABLE "comments" (
	"created_at" timestamp DEFAULT now(),
	"last_edited_at" timestamp DEFAULT now(),
	"id" uuid PRIMARY KEY NOT NULL,
	"manga_id" uuid NOT NULL,
	"critic_id" uuid NOT NULL,
	"score" numeric NOT NULL,
	"review_description" text NOT NULL,
	"likes" numeric DEFAULT '0' NOT NULL,
	"dislikes" numeric DEFAULT '0' NOT NULL,
	"replies_count" numeric DEFAULT '0' NOT NULL,
	"reply_to" uuid
);
--> statement-breakpoint
CREATE TABLE "friends" (
	"user_id" uuid NOT NULL,
	"friend_id" uuid NOT NULL,
	"request_status" "status_enum" DEFAULT 'PENDING' NOT NULL,
	"request_created_at" timestamp DEFAULT now(),
	"accepted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "mangas" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"publisher_id" uuid NOT NULL,
	"title" text NOT NULL,
	"altTitles" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"external_sources" jsonb,
	CONSTRAINT "mangas_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"created_at" timestamp DEFAULT now(),
	"last_edited_at" timestamp DEFAULT now(),
	"id" uuid PRIMARY KEY NOT NULL,
	"manga_id" uuid NOT NULL,
	"critic_id" uuid NOT NULL,
	"score" numeric NOT NULL,
	"semantic_summary" "semantic_summary" NOT NULL,
	"review_heading" text NOT NULL,
	"review_description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_manga_list" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"manga_id" uuid NOT NULL,
	"reading_status" "list_status" DEFAULT 'PLAN_TO_READ' NOT NULL,
	"score" numeric,
	"added_at" timestamp DEFAULT now() NOT NULL,
	"last_updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_manga_unique" UNIQUE("user_id","manga_id")
);
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_manga_id_mangas_id_fk" FOREIGN KEY ("manga_id") REFERENCES "public"."mangas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_critic_id_users_id_fk" FOREIGN KEY ("critic_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_reply_to_comments_id_fk" FOREIGN KEY ("reply_to") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "friends" ADD CONSTRAINT "friends_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "friends" ADD CONSTRAINT "friends_friend_id_users_id_fk" FOREIGN KEY ("friend_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_manga_id_mangas_id_fk" FOREIGN KEY ("manga_id") REFERENCES "public"."mangas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_critic_id_users_id_fk" FOREIGN KEY ("critic_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_manga_list" ADD CONSTRAINT "user_manga_list_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_manga_list" ADD CONSTRAINT "user_manga_list_manga_id_mangas_id_fk" FOREIGN KEY ("manga_id") REFERENCES "public"."mangas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_status_idx" ON "user_manga_list" USING btree ("user_id","manga_id");