import { writable } from 'svelte/store';
import type { User } from './user';
import { mapper } from '../tools/mapper';


class Store{
  private url='https://users-b9804-default-rtdb.europe-west1.firebasedatabase.app/users'
  users = writable<User[]>([])
  constructor(){
    this.GetUsers()
    // console.log('BuildUsersStore', this.realUsers);
  }

  async GetUsers() {
    try {
      const response = await fetch(this.url+'.json')
      if (!response.ok) throw new Error(`Errore nella richiesta: ${response.status}`);
      const data =await response.json()
      this.users.set(mapper(data))
      
    } catch (error) {
      console.error("Errore durante il recupero degli utenti:", error);
      this.users.set([])
    }
  }


  async PostUser(newUser:User) {
    try {
      const res = await fetch(this.url+'.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      this.GetUsers()
      console.log('post', newUser )
    
    }catch (error){ console.error("Errore durante l'aggiunta dei dati:", error) }
  }


  async PatchUser(updatedUser:User) {
    try {
      const res = await fetch(`${this.url}/${updatedUser.key}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      })
      if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      this.GetUsers()
      console.log('patch', updatedUser )
      
    }catch(error){ console.error("Errore durante la modifica dei dati:", error) }
  }


  async DeleteUser(userKey:string) {
    try {
      const res = await fetch(`${this.url}/${userKey}.json`,{ method: 'DELETE' })
      if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      this.GetUsers()
      console.log('delete', userKey )
      
    }catch(error){ console.error("Errore durante l'eliminazione dei dati:", error) }
  }
}
export const UsersStore = new Store()
