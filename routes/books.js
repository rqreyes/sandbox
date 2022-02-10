import express from "express";
import { nanoid } from "nanoid";

export const booksRouter = express.Router();

const idLength = 8;
const DELAY = 2000;

booksRouter.get("/", async (req, res) => {
  const { books } = req.app.db.data;

  res.send(books);
});

booksRouter.get("/:id", async (req, res) => {
  const { books } = req.app.db.data;

  books.find((book) => book.id === req.params.id);

  setTimeout(() => {
    res.send(book);
  }, DELAY);
});

booksRouter.post("/", async (req, res) => {
  const { books } = req.app.db.data;

  try {
    const book = {
      author: req.body.author,
      id: nanoid(idLength),
      title: req.body.title,
    };

    books.push(book);
    await req.app.db.write();

    setTimeout(() => {
      res.send(book);
    }, DELAY);
  } catch (error) {
    return res.status(500).send(error);
  }
});

booksRouter.put("/:id", async (req, res) => {
  const { books } = req.app.db.data;

  try {
    let bookUpdated = null;
    const booksUpdated = books.map((book) => {
      if (book.id === req.params.id) {
        bookUpdated = {
          ...book,
          author: req.body.author,
          title: req.body.title,
        };

        return bookUpdated;
      } else {
        return book;
      }
    });

    req.app.db.data = { books: booksUpdated };
    await req.app.db.write();

    setTimeout(() => {
      res.send(bookUpdated);
    }, DELAY);
  } catch (error) {
    return res.status(500).send(error);
  }
});

booksRouter.delete("/:id", async (req, res) => {
  const { books } = req.app.db.data;
  const booksFiltered = books.filter((book) => book.id !== req.params.id);

  req.app.db.data = { books: booksFiltered };
  await req.app.db.write();

  setTimeout(() => {
    res.sendStatus(200);
  }, DELAY);
});
