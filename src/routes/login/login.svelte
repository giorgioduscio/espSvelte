<script>
  import inputType from "../../tools/inputType";
  import { paragraph } from "../../tools/paragraph";
  import LoginComponent from "./login";
  import './login.sass'
  // @ts-ignore
  import Navbar from "../../lib/navbar/Navbar.svelte"
  import { push } from "svelte-spa-router";
  import { buildSmartForm } from "../../tools/smartForm";

  document.title ='Login'
  let { onSubmit, form } =new LoginComponent()
  
  $: {
    form =buildSmartForm(form)
    // console.log('Form', )
  }
</script>


<article id="login">
  <Navbar />
  <form on:submit|preventDefault={onSubmit}>

    <header>
      <h1>{ document.title }</h1>
      <p>I campi contrassegnati da * sono obbligatori</p>
    </header>

    <main> 
      {#each Object.keys(form).filter(k=>k!=='valid') as key} 

      <!-- CHECKBOX -->
      {#if key==='terms_and_conditions'}
      <div class="form-check">
        <input class="form-check-input
          {form[key].valid && form[key].touched ?'is-valid' :''}
          {!form[key].valid && form[key].touched ?'is-invalid' :''}
        " 
        type="checkbox" bind:checked={form[key].value} id={key}
        on:blur={()=> form[key].touched=true}
        >
        <label class="form-check-label" for={key}>{paragraph(key)}</label>
      </div>

      <!-- SELECT -->
      {:else if typeof form[key].type==='object'}
      <div>
        <select
          class="form-select text-bg-dark 
            {form[key].valid && form[key].touched ?'is-valid' :''}
            {!form[key].valid && form[key].touched ?'is-invalid' :''}
          " 
          bind:value={form[key].value}
          on:blur={()=> form[key].touched=true}
        > <option selected value="" style="display: none;">{paragraph(key)} {form[key].valid ?'' :'*'}</option>
          {#each Object.entries(form[key].type) as opt}
            <option value={ opt[0] }>{ opt[1] }</option>
          {/each}
        </select>
        {#if !form[key].valid && form[key].touched}
          <div class="invalid-feedback">Campo obbligatorio. { form[key].message }</div>
        {/if}
      </div>

      <!-- DEFAULT -->
      {:else}
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
        disabled={!form.valid || form.password.value!==form.confirm_password.value}
        >Send</button>
      <button class="btn btn-secondary" type="button" on:click={()=>push('/access')}>Access</button>
    </footer>

  </form>
</article>