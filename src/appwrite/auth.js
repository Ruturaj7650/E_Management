 import conf from "../conf/conf";
 import {Client,Account,ID} from "appwrite";
 

 export class AuthService{
    client=new Client();
    account;


    

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }

    async createAccount({email,password,name}){
  try {
        const useraccount= await this.account.create(ID.unique(),email,password,name);

if(useraccount){
      // call another function
      return this.login({email,password})
}else{
    return console.log("error has observed in create acount method in auth.js");
   // return  console.log("Appwrite service:: createuser :: error",error);
}
  } catch (error) {
    console.log("Appwrite service:: getcurrentuser :: error",error);
  }
 }

    async login(email,password){
try {
     return await this.account.createEmailPasswordSession(email,password)

} catch (error) {
    console.log("Appwrite service:: login :: error",error);

}  }
/*
async getcurrentuser() {
    try {
      // Ensure that the user is authenticated
      const session = await this.client.account.getSession('current'); // Fetch current session
  
      if (!session) {
        // If no session, prompt user to login
        console.log('User not authenticated, please login first');
        return;
      }
  
      // Set the session's JWT token for authenticated requests
      this.client.setJWT(session.jwt);
  
      // Fetch the current user
      const user = await this.client.account.get();
      console.log('Current user:', user);
  
    } catch (error) {
      console.error('Error:', error.message);  // Handle errors (e.g., permissions, authentication)
    }
  }
  */

async getcurrentuser(){
    try {
        return await this.account.get()
    } catch (error) {
        console.log("Appwrite service:: getcurrentuser :: error",error);
    }
    return null;
}


async logout(){
try {
    await this.account.deleteSessions('all')
    
} catch (error) {
    console.log("Appwrite service:: logoutuser :: error",error);
}}

 }


const authService =new AuthService();

 export default authService;