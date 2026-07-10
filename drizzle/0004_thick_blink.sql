ALTER TABLE "users" ADD COLUMN "profile_pic" text;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_profile_pic_unique" UNIQUE("profile_pic");