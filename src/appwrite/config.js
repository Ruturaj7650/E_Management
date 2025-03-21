import conf from "../conf/conf.js";
import {Client,Storage,Databases,ID,Query} from "appwrite";

export class databaseServices {

client =new Client();
databases;
bucket;
constructor(){

this.client
.setEndpoint(conf.appwriteUrl)
.setProject(conf.appwriteProjectId)
this.databases = new Databases(this.client);
this.bucket =new Storage(this.client);

}

async CreatePost({title,slug,content,featureImage,status,userId}){

    try {
         return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {title,
            content,
            featureImage,
            status,
            userId}
        )


    } catch (error) {
        console.log("Appwrite service:: CreatePost :: error",error);
    }
}

async updatePost(slug,{title,content,featureImage,status}){

    try {
         return await  this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {title,
            content,
            featureImage,
            status
            }
         )
    } catch (error) {
        console.log("Appwrite service:: uploadPost :: error",error);
    }
}

async deletePost(slug)
{
 try {
    await  this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
    )
    return true
 } catch (error) {
    console.log("Appwrite service:: deletepost :: error",error);
    return false  
   }

}
async getPost(slug){

    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )

    } catch (error) {
        console.log("Appwrite service:: getpost :: error",error);
        return false
    }
    
}

async getPosts(queries=[Query.equal("status","active")]){

    try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
        )
    } catch (error) {
        console.log("Appwrite service:: getposts :: error",error);
        return false
    }
}

//file upload services

async uploadfile(file){
    try {
        return await this.bucket.createFile(
            conf.appwritebucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("Appwrite service:: fileupload :: error",error);
        return false
    }
}

async deletefile(fileid){
try {
    await this.bucket.deleteFile(
        conf.appwritebucketId,
        fileid
     )
     return true
} catch (error) {
    console.log("Appwrite service:: deletefileupload :: error",error);
        return false
    }
}

async getpreviewfile(fileid){
          return this.bucket.getFilePreview(
            conf.appwritebucketId,
            fileid,
        )
   
}

}



export default databaseServices





