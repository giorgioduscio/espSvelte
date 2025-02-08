<script lang="ts">
  import './dashboard.sass'
  // @ts-ignore
  import Navbar from '../../lib/navbar/Navbar.svelte';
  import inputType from '../../tools/inputType';
  import { UsersStore } from '../../stores/usersStore';
  import { AuthStore } from '../../auth/authStore';
  import {DashboardComponent} from './dashboard';
  import { paragraph } from '../../tools/paragraph';
  import AuthGuard from '../../auth/authGuard';


  document.title ='Dashboard'
  let DC =DashboardComponent
  UsersStore.users.subscribe(value => {
    DC.users = value
  })
  
  let isAuth =false
  AuthStore.isAuthenticated.subscribe(i=> isAuth=i)
  AuthGuard() //fix
</script>

{#if isAuth}
<Navbar />
<article id={document.title} class="text-bg-dark">

  <header>
    <button class="btn btn-outline-success" on:click={DC.handleAddUser}>Aggiungi Utente</button>
  </header>

  <main class="table-responsive">
    <table class="table table-dark table-borderless"> 
    <tbody> 
      <tr> <th></th>
        {#each DC.showFields(DC.users[0]) as key}
        <th>{ paragraph(key) }</th>
        {/each}
      </tr>


      {#if DC.users} {#each DC.users as user, i}
        <tr>
          <td><button class="btn btn-outline-danger bi bi-trash3-fill" 
            on:click={()=>DC.handleDeleteUser(i)}></button>
          </td>
          {#each DC.showFields(user) as field} 
            <td>
              <input 
                class="form-control text-bg-dark"
                type={inputType(user[field], field)}
                value={user[field]} 
                id={i+field} name={field}
                on:change={(e:Event)=> DC.handleChange(i, e)}
              >
            </td>
          {/each}
        </tr>
      
      {/each} {:else}
        <tr><td>Caricamento utenti...</td></tr>
      {/if}
    </tbody> 
    </table>
  </main>

</article>
{/if}
