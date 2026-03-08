import { pgTable, primaryKey } from "drizzle-orm/pg-core";

export const nameBasics = pgTable("name_basics", (t) => ({
  nconst: t.text("nconst").primaryKey(),
  primaryName: t.text("primaryname"),
  birthYear: t.integer("birthyear"),
  deathYear: t.integer("deathyear"),
  primaryProfession: t.text("primaryprofession"),
  knownForTitles: t.text("knownfortitles"),
}));

export const titleAkas = pgTable("title_akas", (t) => ({
  titleId: t.text("titleid"),
  ordering: t.integer("ordering"),
  title: t.text("title"),
  region: t.text("region"),
  language: t.text("language"),
  types: t.text("types"),
  attributes: t.text("attributes"),
  isOriginalTitle: t.boolean("isoriginaltitle"),
}));

export const titleBasics = pgTable("title_basics", (t) => ({
  tconst: t.text("tconst").primaryKey(),
  titleType: t.text("titletype"),
  primaryTitle: t.text("primarytitle"),
  originalTitle: t.text("originaltitle"),
  isAdult: t.boolean("isadult"),
  startYear: t.integer("startyear"),
  endYear: t.integer("endyear"),
  runtimeMinutes: t.integer("runtimeminutes"),
  genres: t.text("genres"),
}));

export const titleCrew = pgTable("title_crew", (t) => ({
  tconst: t.text("tconst").primaryKey(),
  directors: t.text("directors"),
  writers: t.text("writers"),
}));

export const titleEpisode = pgTable("title_episode", (t) => ({
  tconst: t.text("tconst").primaryKey(),
  parentTconst: t.text("parenttconst"),
  seasonNumber: t.integer("seasonnumber"),
  episodeNumber: t.integer("episodenumber"),
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
  averageRating: t.numeric("averagerating", { precision: 3, scale: 1 }),
  numVotes: t.integer("numvotes"),
}));
