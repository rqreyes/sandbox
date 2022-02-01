import express from "express";
import cors from "cors";
import morgan from "morgan";
import { Low, JSONFile } from "lowdb";
import { booksRouter } from "./routes/books.js";

const app = express();
const PORT = process.env.PORT || 4000;
const adapter = new JSONFile("db.json");
const db = new Low(adapter);

await db.read();
db.data ||= { books: [] };
await db.write();

app.db = db;
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/books", booksRouter);

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
