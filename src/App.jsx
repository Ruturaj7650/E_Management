//import {Outlet} from '@reduxjs/toolkit'
import { useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';

function App() {
const [loading,setLoading]=useState(true);
const dispatch= useDispatch()  
  
useEffect(()=>{
authService.getcurrentuser()
.then((userdata)=>{
  if(userdata){
    dispatch(login({userdata}))
  }else{
    dispatch(logout())
  }
})
.finally(()=>setLoading(false))
},)

  return !loading?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-500'>
      <div className='w-full block'>
        <Header/>   
        <h1>ToDo</h1>
       <main>
        {/*<Outlet/>*/}
       </main>

       <Footer/>

      </div>
      
    </div>
  ):null
}

export default App
