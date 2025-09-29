import { relations } from "drizzle-orm";
import { text, timestamp, uuid } from "drizzle-orm/pg-core";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

// 사용자 정보 디비 칼럼
export const user = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  conversation: many(conversation),
}));

//대화 내용 디비 칼럼
export const conversation = pgTable("conversations", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  userId: uuid("userId")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
});

export const conversationRelations = relations(
  conversation,
  ({ one, many }) => ({
    user: one(user, {
      fields: [conversation.userId], //참조키
      references: [user.id],
    }),
    massage: many(massage),
  })
);

//대회 안의 메시지 칼럼
export const massage = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  content: text("content"),
  role: text("role").$type<"user" | "assistant">(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  conversationId: uuid("conversationId")
    .references(() => conversation.id, { onDelete: "cascade" })
    .notNull(),
});

export const massageRelations = relations(massage, ({ one }) => ({
  conversation: one(conversation, {
    fields: [massage.conversationId], //참조키
    references: [conversation.id],
  }),
}));
