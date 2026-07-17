CREATE TYPE "public"."creator_contribution" AS ENUM('WRITER', 'ARTIST', 'ARTIST_&_WRITER', 'PUBLISHER', 'TRANSLATOR');--> statement-breakpoint
CREATE TABLE "chapters" (
	"id" uuid NOT NULL,
	"chapter_title" text,
	"chapter_number" numeric NOT NULL,
	"chapter_source" jsonb DEFAULT '{"data_saver":{},"highest_quality":{}}'::jsonb,
	"chapter_language" text,
	"publisher_info" jsonb,
	CONSTRAINT "chapters_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "creators" (

);
--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "manga_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "chapter_id" uuid;--> statement-breakpoint
ALTER TABLE "mangas" ADD COLUMN "manga_slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "mangas" ADD COLUMN "author_details" jsonb;--> statement-breakpoint
ALTER TABLE "mangas" ADD COLUMN "publisher_details" jsonb;--> statement-breakpoint
ALTER TABLE "mangas" ADD COLUMN "manga_status" "manga_status" DEFAULT 'ONGOING' NOT NULL;--> statement-breakpoint
ALTER TABLE "mangas" ADD COLUMN "manga_dex_id" text;--> statement-breakpoint
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_id_mangas_id_fk" FOREIGN KEY ("id") REFERENCES "public"."mangas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_chapter_id_chapters_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."chapters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mangas" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "mangas" DROP COLUMN "publisher_id";--> statement-breakpoint
ALTER TABLE "mangas" DROP COLUMN "external_sources";--> statement-breakpoint
ALTER TABLE "mangas" ADD CONSTRAINT "mangas_manga_slug_unique" UNIQUE("manga_slug");