CREATE TABLE IF NOT EXISTS Users (
  id            STRING PRIMARY KEY NOT NULL,
  name          STRING NOT NULL,
  email         STRING NOT NULL,
  password      STRING NOT NULL,
  created_at    TIMESTAMP(3) NOT NULL DEFAULT current_timestamp():::TIMESTAMP
);