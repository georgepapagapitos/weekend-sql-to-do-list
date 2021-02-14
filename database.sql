-- Create table called todos
CREATE TABLE "todos" (
	"id" SERIAL PRIMARY KEY,
	"todo" VARCHAR(1024) NOT NULL,
	"isComplete" BOOLEAN NOT NULL DEFAULT FALSE
);

-- Inserts for testing
INSERT INTO "todos" ("todo", "isComplete")
VALUES 
('This is your to do list', FALSE),
('Add items', FALSE),
('Delete items', FALSE);