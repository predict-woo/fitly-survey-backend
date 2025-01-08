CREATE TABLE `registrations` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` integer PRIMARY KEY NOT NULL,
	`star` integer,
	`review` text
);
--> statement-breakpoint
CREATE TABLE `user_inputs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`experience` integer,
	`age` integer,
	`height` real,
	`weight` real,
	`style` text,
	`goal` text,
	`frequency` text,
	`duration` text,
	`time` text,
	`allergy` text,
	`supplementUsed` text,
	`supplementUsedType` text,
	`supplementImportance` text,
	`supplementForm` text,
	`price` real
);
