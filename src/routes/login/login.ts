import type { User } from "../../stores/user";
import { UsersStore } from "../../stores/usersStore";
import { randomId, randomImage } from "../../tools/randomCompiler";
import { loginForm } from "./loginForm";

// asterisco, colore validazione
export default class LoginComponent {  
  form =loginForm

  // INVIA DATI ALLO SHOP
  onSubmit =()=>{
    let newUser :User ={
      id: randomId(),
      username: this.form.username.value.toString(),
      email: this.form.email.value.toString(),
      password: this.form.password.value.toString(),
      imageUrl: randomImage(),
      role: Number(this.form.role.value)
    }
    // console.log(newUser);
    UsersStore.PostUser(newUser)
  }
}