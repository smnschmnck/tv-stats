import { pgTable, primaryKey } from "drizzle-orm/pg-core";

export const nameBasics = pgTable("name_basics", (t) => ({
  nconst: t.text("nconst").primaryKey(),
  primaryName: t.text("primaryName"),
  birthYear: t.integer("birthYear"),
  deathYear: t.integer("deathYear"),
  primaryProfession: t.text("primaryProfession"),
  knownForTitles: t.text("knownForTitles"),
}));

export const titleAkas = pgTable("title_akas", (t) => ({
  titleId: t.text("titleId"),
  ordering: t.integer("ordering"),
  title: t.text("title"),
  region: t.text("region"),
  language: t.text("language"),
  types: t.text("types"),
  attributes: t.text("attributes"),
  isOriginalTitle: t.boolean("isOriginalTitle"),
}));

export const titleBasics = pgTable("title_basics", (t) => ({
  tconst: t.text("tconst").primaryKey(),
  titleType: t.text("titleType"),
  primaryTitle: t.text("primaryTitle"),
  originalTitle: t.text("originalTitle"),
  isAdult: t.boolean("isAdult"),
  startYear: t.integer("startYear"),
  endYear: t.integer("endYear"),
  runtimeMinutes: t.integer("runtimeMinutes"),
  genres: t.text("genres"),
}));

export const titleCrew = pgTable("title_crew", (t) => ({
  tconst: t.text("tconst").primaryKey(),
  directors: t.text("directors"),
  writers: t.text("writers"),
}));

export const titleEpisode = pgTable("title_episode", (t) => ({
  tconst: t.text("tconst").primaryKey(),
  parentTconst: t.text("parentTconst"),
  seasonNumber: t.integer("seasonNumber"),
  episodeNumber: t.integer("episodeNumber"),
}));

export const titlePrincipals = pgTable(
  "title_principals",
  (t) => ({
    tconst: t.text("tconst"),
    ordering: t.integer("ordering"),
    nconst: t.text("nconst"),
    category: t.text("category"),
    job: t.text("job"),
    characters: t.text("characters"),
  }),
  (t) => [primaryKey({ columns: [t.tconst, t.ordering] })],
);

export const titleRatings = pgTable("title_ratings", (t) => ({
  tconst: t.text("tconst").primaryKey(),
  averageRating: t.numeric("averageRating", { precision: 3, scale: 1 }),
  numVotes: t.integer("numVotes"),
}));
