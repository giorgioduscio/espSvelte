// auth-store.ts
import { writable } from 'svelte/store';
import type { User } from '../stores/user';
import { UsersStore } from '../stores/usersStore';
import { push } from 'svelte-spa-router';
import AuthGuard from './authGuard';

class Store{
  user = writable<User |undefined>(undefined)
  isAuthenticated =writable(false)
  constructor(){
    this.getId()
  }
  
  // Funzioni per gestire l'autenticazione
  async login(checkUser: User){
    UsersStore.users.subscribe(users=>{
      const match =users.find(user=> 
        user.email===checkUser.email &&
        user.password===checkUser.password
      )
      if(match){
        localStorage.setItem('userId', match.id.toString())
        this.user.set(match)
        this.isAuthenticated.set(true)
        push('/promotions')
      }
    })
  }
  async getId(){
    let userId =await localStorage.getItem('userId')
    
    if(userId) UsersStore.users.subscribe(users=>{
      let match =users.find(user=> user.id===Number(userId))
      if(match){ 
        this.user.set(match)
        this.isAuthenticated.set(true)
      }
    })
  }
  
  // RIMUOVE TUTTO CIO' CHE RIGUARDA L'AUTENTICAZIONE
  async logout(){ 
    this.user.set(undefined)
    this.isAuthenticated.set(false)
    localStorage.removeItem('userId')
    console.log('logout');
    AuthGuard() //fix
  }
}
export const AuthStore =new Store()
