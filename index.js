import express from "express";
import cors from "cors";
import morgan from "morgan";
import { Low, JSONFile } from "lowdb";

const PORT = process.env.PORT || 4000;

const adapter = new JSONFile("db.json");
const db = new Low(adapter);

await db.read();

db.data ||= { books: [] };
const { books } = db.data;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
