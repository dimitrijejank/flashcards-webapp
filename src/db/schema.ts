import {pgTable, serial, varchar, integer, timestamp, uuid} from "drizzle-orm/pg-core";

//Korisnici
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passHash: varchar("pass_hash", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const subjects = pgTable("subject", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", {length:255}).notNull(),
    createdAt: timestamp("created_at").defaultNow()
});

export const decks = pgTable("deck", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length:255 }).notNull(),
    subjectId: uuid("subject_id").references(() => subjects.id).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const flashCards = pgTable("flash_cards", {
    id: uuid("id").primaryKey().defaultRandom(),
    front: varchar("front", {length: 255}).notNull(),
    back: varchar("back", {length:255}).notNull(),
    deckId: uuid("deck_id").references(() => decks.id).notNull(),
    createdAt: timestamp("created_at").defaultNow()
});

export const attempts = pgTable("attempts", {
    id: uuid("id").primaryKey().defaultRandom(),
    deckId: uuid("deck_id").references(() => decks.id).notNull(),
    attemptedAt: timestamp("attempted_at").defaultNow()
});

export const attemptCards = pgTable("attempt_cards", {
    id: uuid("id").primaryKey().defaultRandom(),
    attemptId: uuid("attempt_id").references(() => attempts.id).notNull(),
    cardId: uuid("card_id").references(() => flashCards.id).notNull(),
    grade: integer("grade").notNull()
})