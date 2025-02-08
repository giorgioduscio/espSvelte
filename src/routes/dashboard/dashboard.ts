import type { User } from "../../stores/user"
import { UsersStore } from "../../stores/usersStore"
import { randomId, randomString, randomImage } from "../../tools/randomCompiler"

class Component{
  users :User[] =[]
  showFields =(user:User)=>{
    return Object.keys(user) 
    .filter(k=>k==='username' || k==='email' || k==='role')
  }

  async handleAddUser() {
    const newUser :User ={
      id: randomId(),
      username: randomString(),
      email: randomString() + '@gmail',
      password: randomString(),
      imageUrl: randomImage(),
      role: 2
    }    
    await UsersStore.PostUser(newUser)
  }

  async handleDeleteUser(index:number){
    if(confirm('Cancellare?')) 
      await UsersStore.DeleteUser(this.users[index].key!)
  }

  async handleChange(i:number, e:Event) {
    let {value, name} =e?.target as HTMLInputElement
    let $id =name as keyof User
    let newValue =typeof this.users[i][$id]==='number' ?Number(value) :value
    let newUser ={ ...this.users[i], [name]:newValue}
    
    await UsersStore.PatchUser(newUser)
  }
}
export const DashboardComponent =new Component()