CREATE TABLE IF NOT EXISTS Users (
  id            STRING PRIMARY KEY NOT NULL,
  name          STRING NOT NULL,
  email         STRING NOT NULL,
  password      STRING NOT NULL,
  created_at    TIMESTAMP(3) NOT NULL DEFAULT current_timestamp():::TIMESTAMP,
  community_id  STRING,
  CONSTRAINT communities FOREIGN KEY (community_id) REFERENCES Communities( community_id )
);

CREATE TABLE IF NOT EXISTS Communities (
  community_id  STRING PRIMARY KEY NOT NULL,
  name          STRING NOT NULL,
  description   STRING NOT NULL,
  tags          STRING[],
  created_at    TIMESTAMP(3) NOT NULL DEFAULT current_timestamp():::TIMESTAMP
);