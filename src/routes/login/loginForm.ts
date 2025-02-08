import type { SmartField } from "../../tools/smartForm";

export const loginForm :{[k:string]:SmartField} ={
  username:{ 
    value: "", type: "text", message:'', 
    required:true 
  },
  role:{
    value: "", message: "", required:true,
    type:{
      0:'Admin',
      1:'Writer',
      2:'User'
    }
  },
  email:{ 
    value: "", type: "email", message:'Inserisci @.', 
    required:true 
  },
  password:{ 
    value: "", type: "password", message:`La password deve essere compresa tra 4 e 8 lettere.`, 
    required:true, minLength:5, maxLength:16 
  },
  confirm_password:{ 
    value: "", type: "password", message:'Questo campo deve essere uguale alla password.', 
    required:true 
  },
  description:{
    value: "", type: "textarea", message: ""
  },
  terms_and_conditions: { 
    value: false, type: "checkbox", message:'', 
    required:true 
  },
}