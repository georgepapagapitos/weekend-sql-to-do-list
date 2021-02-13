CREATE TABLE "todos" (
	"id" SERIAL PRIMARY KEY,
	"todo" VARCHAR(1024) NOT NULL,
	"isComplete" BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO "todos" ("todo", "isComplete")
VALUES 
('This is your to do list', FALSE),
('Add items', FALSE),
('Delete items', FALSE);