import { createApp } from 'vue'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import Plugin from '@/.'

const app = createApp(App)
const vuetify = createVuetify()
app.use(vuetify)
app.use(Plugin)

app.mount('#app')
