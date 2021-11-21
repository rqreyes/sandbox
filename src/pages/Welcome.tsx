import { Link, Outlet } from "react-router-dom";

export const Welcome = () => (
  <section>
    <h1>Welcome</h1>
    <Link to="new-user">New User</Link>
    <Outlet />
  </section>
);
