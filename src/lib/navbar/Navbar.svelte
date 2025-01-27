<script>

  import { push } from "svelte-spa-router"
  import './Navbar.sass'

</script>

<nav id="navbar">
  <button on:click={() => push('/login')}>Login</button>
  <button on:click={() => push('/dashboard')}>Dashboard</button>
</nav>
