import { BookAdd } from "./BookAdd";
import { BookList } from "./BookList";

export const Home = (): JSX.Element => (
  <>
    <BookList />
    <BookAdd />
  </>
);
