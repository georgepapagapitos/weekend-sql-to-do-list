CREATE TABLE "todos" (
	"id" SERIAL PRIMARY KEY,
	"todo" VARCHAR(1024) NOT NULL,
	"isComplete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "todos" ("todo", "isComplete")
VALUES 
('This is your todo list', FALSE),
('Add items', FALSE),
('Delete items', FALSE);