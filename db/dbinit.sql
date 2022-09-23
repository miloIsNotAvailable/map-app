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

CREATE TABLE IF NOT EXISTS UsersCommunitiesBridge (
 user_id STRING,
 community_id  STRING,
 CONSTRAINT communities FOREIGN KEY (community_id) REFERENCES Communities( community_id ),
 CONSTRAINT users FOREIGN KEY (user_id) REFERENCES Users( id )
);

CREATE TABLE IF NOT EXISTS Post (
 post_id                   STRING PRIMARY KEY,
 user_id                   STRING,
 community_id              STRING,
 community_bridge_id       STRING,
 votes                     INT,
 content                   STRING,
 type                      STRING,
 title                     STRING,
 CONSTRAINT communities FOREIGN KEY (community_id) REFERENCES Communities( community_id ),
 CONSTRAINT users FOREIGN KEY (user_id) REFERENCES Users( id )
);

CREATE TABLE IF NOT EXISTS Vote (
 vote_id                   STRING PRIMARY KEY,
 user_id                   STRING,
 post_id                   STRING,
 upvoted                   BOOL,
 downvoted                 BOOL,
 CONSTRAINT post FOREIGN KEY (post_id) REFERENCES Post( post_id ),
 CONSTRAINT users FOREIGN KEY (user_id) REFERENCES Users( id )
);