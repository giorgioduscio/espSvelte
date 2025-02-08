<script>
  // @ts-ignore
  import Navbar from '../../lib/navbar/Navbar.svelte'
  import './login.sass'
  import { push } from 'svelte-spa-router';
  import AccessComponent from './access';
  import { paragraph } from '../../tools/paragraph';
  import { buildSmartForm } from '../../tools/smartForm';

  document.title ='Access'
  let { form, onSubmit } =new AccessComponent()

  $:{
    form =buildSmartForm(form)
    // console.log(form);
  }
</script>

<article id={ document.title }>
  <Navbar />
  <form on:submit|preventDefault={onSubmit} class="needs-validation">

    <header>
      <h1>{ document.title }</h1>
      <p>I campi contrassegnati da * sono obbligatori</p>
    </header>
    
    <main> 
      {#each Object.keys(form) as key} {#if key!=='valid'}
      <div class="form-floating">
        <input type={form[key].type} 
          class="form-control text-bg-dark 
            {form[key].valid && form[key].touched ?'is-valid' :''}
            {!form[key].valid && form[key].touched ?'is-invalid' :''}
          " 
          id={key} placeholder=''
          bind:value={form[key].value}
          on:blur={()=> form[key].touched=true}
        >
        <label for={key}>{paragraph(key)} {form[key].valid ?'' :'*'}</label>
        {#if !form[key].valid && form[key].touched}
          <div class="invalid-feedback">Campo obbligatorio. { form[key].message }</div>
        {/if}
      </div>
      {/if}{/each}
    </main>

    <footer>
      <button class="btn btn-primary" type="submit" 
        disabled={!form.valid}
        >Send</button>
      <button class="btn btn-secondary" type="button" on:click={()=>push('/login')}>Login</button>
    </footer>

  </form>
</article>