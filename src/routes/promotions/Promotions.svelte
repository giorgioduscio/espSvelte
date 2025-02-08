<script>
  import './Promotions.sass'
  import { AuthStore } from "../../auth/authStore";
  import Navbar from "../../lib/navbar/Navbar.svelte";
  import { PromotionsComponent } from "./Promotions";
  import AuthGuard from '../../auth/authGuard';

  document.title ='Promotions'
  const PC =PromotionsComponent

  let isAuth =false
  AuthStore.isAuthenticated.subscribe(i=> isAuth=i)
  AuthGuard() //fix
</script>

{#if isAuth}
<div id="promotions">
  <Navbar />

  <article><div>
    <h1>Benvenuto</h1>
    <p>Se stai guardando questa pagina, significa che risulti registrato al nostro sito</p>
  </div></article>

</div>
{/if}