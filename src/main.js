import { createApp } from 'vue'

import App from './App.vue'
import mondaySdk from 'monday-sdk-js';

createApp(App).provide('monday', mondaySdk()).mount('#app')
