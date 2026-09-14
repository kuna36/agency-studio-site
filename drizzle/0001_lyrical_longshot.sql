CREATE TABLE `project_inquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(160) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(64),
	`company` varchar(180),
	`projectType` varchar(80) NOT NULL,
	`budget` varchar(80),
	`timeline` varchar(80),
	`description` text NOT NULL,
	`reference` varchar(500),
	`preferredContact` varchar(40) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `project_inquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` varchar(16) NOT NULL DEFAULT 'user';