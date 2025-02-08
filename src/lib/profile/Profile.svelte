<script lang="ts">
  import './Profile.sass'
  import { push } from "svelte-spa-router";
  import { AuthStore } from "../../auth/authStore";
  import type { User } from '../../stores/user';

  let profile :User|undefined =undefined
  AuthStore.user.subscribe(user=> profile =user )
</script>

<div id="profile">
  {#if profile}
  <img src={profile.imageUrl} alt={profile.email}>
  <button class="btn btn-outline-danger" on:click={()=>AuthStore.logout()}>Esci</button>
  
  {:else}
  <div class="btn-group" role="group" aria-label="Basic example">
    <button class="btn btn-outline-secondary" on:click={()=> push('/login')}>Login</button>
    <button class="btn btn-outline-primary" on:click={()=> push('/access')}>Accesso</button>
  </div>

  {/if}
</div>