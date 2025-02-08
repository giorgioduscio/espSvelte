import { mount } from 'svelte'
import './app.sass'
import App from './App.svelte'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap'


const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
