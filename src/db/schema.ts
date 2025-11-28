import {
  pgTable,
  varchar,
  integer,
  doublePrecision,
  index,
} from "drizzle-orm/pg-core";

export const ratings = pgTable(
  "ratings",
  {
    tconst: varchar("tconst").primaryKey(),
    averageRating: doublePrecision("average_rating").notNull(),
    numVotes: integer("num_votes").notNull(),
  },
  (table) => [
    index("avg_rating_idx").on(table.averageRating),
    index("num_votes_idx").on(table.numVotes),
    index("ratings_tconst_idx").on(table.tconst),
  ],
);

export const episodes = pgTable(
  "episodes",
  {
    tconst: varchar("tconst").primaryKey(),
    parentTconst: varchar("parent_tconst").notNull(),
    seasonNumber: integer("season_number"),
    episodeNumber: integer("episode_number"),
  },
  (table) => [
    index("parent_season_episode_idx").on(
      table.parentTconst,
      table.seasonNumber,
      table.episodeNumber,
    ),
    index("episodes_tconst_idx").on(table.tconst),
    index("episodes_parent_idx").on(table.parentTconst),
  ],
);
