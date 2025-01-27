// src/stores/usersStore.js
import { writable } from 'svelte/store';
import type { User } from './user';
import { mapper } from '../tools/mapper';

const url='https://users-b9804-default-rtdb.europe-west1.firebasedatabase.app/users'

function createUsersStore() {
  const { subscribe, set, update } = writable<User[]>([])

  return { subscribe,

    async GetDatas() {
      try {
        const res = await fetch(url+'.json'); // Esempio di chiamata API GET
        if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const users = await res.json()
        set(mapper(users))
        // console.log('get', users)
        
        
      }catch(error){ console.error("Errore durante il recupero dei dati:", error) }
    },


    async PostData(newUser:User) {
      try {
        const res = await fetch(url+'.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        });
        if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        this.GetDatas()
        console.log('post', newUser )
      
      }catch (error){ console.error("Errore durante l'aggiunta dei dati:", error) }
    },


    async PatchData(updatedUser:User) {
      try {
        const res = await fetch(`${url}/${updatedUser.key}.json`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedUser)
        })
        if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        this.GetDatas()
        console.log('patch', updatedUser )
        
      }catch(error){ console.error("Errore durante la modifica dei dati:", error) }
    },


    async DeleteData(userKey:string) {
      try {
        const res = await fetch(`${url}/${userKey}.json`,{ method: 'DELETE' })
        if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        this.GetDatas()
        console.log('delete', userKey )
        
      }catch(error){ console.error("Errore durante l'eliminazione dei dati:", error) }
    }
    

  }
}

export const usersStore = createUsersStore();