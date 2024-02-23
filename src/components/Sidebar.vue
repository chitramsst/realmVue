<template>
   <div class="flex flex-col h-screen bg-gray-600 text-gray-200 w-64 p-4 pt-16">
      <ul>
        <li class="py-2 w-full bg-gray-900 rounded-lg px-2 hover:bg-gray-900 hover:text-white hover:px-4 hover:rounded-lg flex mt-2" >
          <svg class="h-6 w-6 fill-current text-gray-300 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M2 4c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm5 9h8v-2H7v2zm0-4h8V7H7v2zm-2 4V7H4v6h1zm12-6v2h1V7h-1zm0 4v2h1v-2h-1z"/>
          </svg>
          <span>
          <router-link to="/" class="text-gray-300 w-full">Home</router-link>
        </span>
        </li>
        <li class="py-2 w-full hover:bg-gray-900 hover:text-white hover:px-2 hover:rounded-lg flex px-2 mt-2" >
          <svg class="h-6 w-6 fill-current text-gray-300 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M2 4c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm5 9h8v-2H7v2zm0-4h8V7H7v2zm-2 4V7H4v6h1zm12-6v2h1V7h-1zm0 4v2h1v-2h-1z"/>
          </svg>
          <span>
          <router-link to="/tasks" class="text-gray-300 w-full">Task</router-link>
        </span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    // Component logic
  }
  </script>