<script>
  import './Navbar.sass'
  import { push } from "svelte-spa-router"
  import { routes } from "../../routes"
  import { paragraph } from '../../tools/paragraph';
  import Profile from '../profile/Profile.svelte';

  const dropdown =Object.keys(routes)
    .filter(page=>page && page.length>3)
    .map(page=>({ title:paragraph(page.substring(1)), path:page }))

</script>


<nav class="navbar navbar-expand-sm bg-dark sticky-top" data-bs-theme="dark">
  <div class="container">

    <!-- LOGO E PULSANTE -->
    <button class="navbar-brand" on:click={()=>push('/')}>{ document.title }</button>
    <button class="navbar-toggler" 
      type="button" data-bs-toggle="collapse" 
      data-bs-target="#navbarSupportedContent" 
      aria-controls="navbarSupportedContent" 
      aria-expanded="false" 
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>


    <!-- COLLAPSE -->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        
        <!-- DROPDOWN -->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Articoli</a>
          <ul class="dropdown-menu"> {#each dropdown as page}
            <li><button class="dropdown-item" on:click={() => push(page.path)}>{ page.title }</button></li>
          {/each} </ul>
        </li>
      </ul>
      <Profile/>

    </div>
  </div>
</nav>