import {
  sqliteTable,
  text,
  integer,
  real,
  index,
} from "drizzle-orm/sqlite-core";

export const ratings = sqliteTable(
  "ratings",
  {
    tconst: text("tconst").primaryKey(),
    averageRating: real("average_rating").notNull(),
    numVotes: integer("num_votes").notNull(),
  },
  (table) => [
    index("avg_rating_idx").on(table.averageRating),
    index("num_votes_idx").on(table.numVotes),
  ]
);

export const episodes = sqliteTable(
  "episodes",
  {
    tconst: text("tconst").primaryKey(),
    parentTconst: text("parent_tconst")
      .references(() => ratings.tconst, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    seasonNumber: integer("season_number"),
    episodeNumber: integer("episode_number"),
  },
  (table) => [
    index("parent_season_episode_idx").on(
      table.parentTconst,
      table.seasonNumber,
      table.episodeNumber
    ),
  ]
);
