import { Hono } from "hono";
import { db } from "../db";

export const todoRoute = new Hono()
  .get("/", async (c) => {
    const todos = await db.todo.findMany();
    return c.json(todos);
  })
  .get("/:id", async (c) => {
    const todo = await db.todo.findUnique({ where: { id: c.req.param("id") } });
    return c.json(todo);
  })
  .post("/", async (c) => {
    const data = await c.req.json();
    const todo = await db.todo.create({ data });
    return c.json(todo);
  })
  .delete("/:id", async (c) => {
    const todo = await db.todo.delete({ where: { id: c.req.param("id") } });
    return c.json(todo);
  })
  .put("/:id", async (c) => {
    const todo = await db.todo.update({
      where: { id: c.req.param("id") },
      data: await c.req.json(),
    });
    return c.json(todo);
  });
