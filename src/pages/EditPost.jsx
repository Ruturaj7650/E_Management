import React,{useEffect, useState}from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Container,PostForm } from '../components'


function EditPost() {

const navigate=useNavigate();
const {slug} =useParams;
const [post,setPosts]= useState(null)

useEffect((slug)=>{

 if(slug){
    appwriteService.getPost(slug).then((post)=>{
        if(post){
            setPosts(post)
        }
    })
 }else{
    navigate("/")
 }


},[slug,navigate])

  return post?(
    <div className='py-8'>
        <Container>
            <PostFrom post={post}/>
        </Container>
    </div>
  ):null
}

export default EditPost