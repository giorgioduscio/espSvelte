import { AuthStore } from "../../auth/authStore";
import type { User } from "../../stores/user";
import type { SmartField } from "../../tools/smartForm";
import { loginForm } from "./loginForm";

export default class AccessComponent{
  form :{[k:string]:SmartField}={ email: loginForm.email, password: loginForm.password }


  onSubmit =()=>{
    let userToCheck :User ={
      id: 0,
      username: "",
      email: this.form.email.value.toString(),
      password: this.form.password.value.toString(),
      imageUrl: "",
      role: 2
    }
    AuthStore.login(userToCheck)
  }
}