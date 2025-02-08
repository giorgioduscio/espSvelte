import { push } from "svelte-spa-router";
import Login from "./routes/login/login.svelte";
import Dashboard from "./routes/dashboard/dashboard.svelte";
import Access from "./routes/login/access.svelte";
import Promotions from "./routes/promotions/Promotions.svelte";
import smartRouterConverter from "./tools/smartRouter";

export const { smartRoutes, routes } =smartRouterConverter({
  '/login':     { component: Login },
  '/access':    { component: Access },
  '/dashboard': { component: Dashboard, show:true, auth:[0] },
  '/promotions':{ component: Promotions, show:true, auth:[] },
  
  '/':{component: ()=>{ push('/login'); return null } },
  '*':{component: ()=>'<h1>404 Not Found</h1>' },
})
