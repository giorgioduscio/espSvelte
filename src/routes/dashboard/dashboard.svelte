<script lang="ts">
  import { onMount } from 'svelte';
  import { usersStore } from '../../stores/usersStore';
  import type { User } from '../../stores/user';
  import Navbar from '../../lib/navbar/Navbar.svelte';
  import { randomId, randomImage, randomString } from '../../tools/randomCompiler';

  $: users = $usersStore
  onMount(async () => {
    await usersStore.GetDatas(); 
    // console.log('onMount', users);
  })

  async function handleAddUser() {
    const newUser :User ={
      id: randomId(),
      username: randomString(),
      email: randomString()+'@gmail',
      password: randomString(),
      imageUrl: randomImage(),
    }    
    await usersStore.PostData(newUser)
  }
  
  async function handleDeleteUser(index:number){
    await usersStore.DeleteData(users[index].key!)
  }

  async function handleChange(i:number, e:Event) {
    let {value, name} =e?.target as HTMLInputElement
    let $id =name as keyof User
    let newValue =typeof users[i][$id]==='number' ?Number(value) :value
    let newUser ={ ...users[i], [name]:newValue}
    
    await usersStore.PatchData(newUser)
  }
</script>

<Navbar />
<article>
  <button on:click={handleAddUser}>Aggiungi Utente</button>

  <main>
    {#if $usersStore} {#each $usersStore as user, i}
    <div>
      <button on:click={()=>handleDeleteUser(i)}>Delete</button>
      {#each Object.keys(user) as field} 
        {#if field!=='key' && field!=='id'} 
        <input type="text" 
          value={user[field as keyof User]} 
          id={i+field}
          name={field}
          on:change={(e:Event)=> handleChange(i, e) }
        >
      {/if}{/each}
    </div>
  
    {/each} {:else}
      <p>Caricamento utenti...</p>
    {/if}
  </main>

</article>