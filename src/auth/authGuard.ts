/*
presupposto: se la funzione viene invocata, significa che la pagina richiede almeno l'autenticazione
  
  cosa richiede la pagina?
    autorizzazione: esiste un utente?
      no: rimanda all'accesso
      si: l'utente ha i requisiti richiesti?
        si: successo
        no: rimanda all'accesso

    autenticazione: esiste un utente?
      no: rimanda all'accesso
      si: successo
*/

import { push } from "svelte-spa-router"
import { AuthStore } from "./authStore"
import { smartRoutes } from "../routes"

export default function AuthGuard(){
  let docTitle =document.title.toLowerCase()
  let authorizations =smartRoutes['/'+docTitle].auth
  // l'azione deve essere eseguita solo se prevede auth
  if(authorizations) AuthStore.user.subscribe(user=>{

    // LA PAGINA RICHIEDE AUTORIZZAZIONE
    // ha trovato la pagina nell'elenco di quelle che richiedono autorizzazione
    if (authorizations.length){
      console.log('Richiesta autorizzazione...')
      if (user){
        let isAuthorized =authorizations.some(role => role === user.role)
        if (isAuthorized) console.log('Autorizzato');          
        else {
          console.log('Non autorizzato')
          push('/access')
        }
        
      }else {
        console.log('Non autenticato')
        redirect()
      }
      
      
    // LA PAGINA RICHIEDE AUTENTICAZIONE: auth:[]
    }else{
      console.log('Richiesta autenticazione...')
      if(user) console.log('autenticato')  
      else {
        console.log('Non autenticato')
        redirect()
      }
    }

  })
}

// se l'utente non è autenticato, rimanda ad un'altra pagina
// il meccanismo del counter avviene per prevenire malfunzionamenti durante la ricarica della pagina:
// se l'utente risulta non autenticato nemmeno dopo due volte dopo il delay, esegue il redirect
function redirect() {
  let counter =0
  AuthStore.isAuthenticated.subscribe(isAuth=>{ 
    counter++ // conta quante volte viene aggiornato
    setTimeout(()=>{ 
      if(!isAuth && counter<2){ 
        push('/access')
        console.log('>>> redirect');
      }else console.log('...');
    }, 1000)
  })
}