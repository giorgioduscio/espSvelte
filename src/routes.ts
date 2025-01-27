import { push } from "svelte-spa-router";
import Login from "./routes/login/login.svelte";
import Dashboard from "./routes/dashboard/dashboard.svelte";

export const routes = {
  '/login': Login,
  '/dashboard': Dashboard,

  '/':()=>{ push('/login'); return null },
  '*':()=>'<h1>404 Not Found</h1>',
}
