// import conf from "../conf/conf";
// import { Client, Databases, Storage, Query, ID } from "appwrite";

// export class Services {
//   client = new Client();
//   databases;
//   bucket;
//   constructor() {
//     this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projid);
//     this.databases = new Databases(this.client);
//     this.bucket = new Storage(this.client);
//   }

//   //Creating Document in db
//   async createPost({ title, content, slug, featuredImage, status, userId }) {
//     try {
//       return await this.databases.createDocument(conf.dbid, conf.collid, slug, {
//         title,
//         content,
//         featuredImage,
//         status,
//         userId,
//       });
//     } catch (error) {
//       console.log("Created successfully", error);
//     }
//   }

//   //Updating Document in db
//   async updatePost(slug, { title, content, featuredImage, status }) {
//     try {
//       return await this.databases.updateDocument(conf.dbid, conf.collid, slug, {
//         title,
//         content,
//         featuredImage,
//         status,
//       });
//     } catch (error) {
//       console.log("Updated Successfully", error);
//     }
//   }

//   //Deleting Document in db
//   async deletePost(slug) {
//     try {
//       return await this.databases.deleteDocument(conf.dbid, conf.collid, slug);
//       return true;
//     } catch (error) {
//       console.log("Delete successfully", error);
//       return false;
//     }
//   }

//   //Getting one Document from db
//   async getPost(slug) {
//     try {
//       return await this.databases.getDocument(conf.dbid, conf.collid, slug);
//     } catch (error) {}
//   }

//   //Getting all Document from db
//   async getAllPosts(queries = [Query.equal("status", "active")]) {
//     try {
//       return await this.databases.listDocuments(
//         conf.dbid,
//         conf.collid,
//         queries
//       );
//     } catch (error) {
//       console.log("Error: " + error);
//       return false;
//     }
//   }

//   //file upload
//   async uploadFile(file) {
//     try {
//       return await this.bucket.createFile(conf.buckid, ID.unique(), file);
//     } catch (error) {
//       console.log("File not uploaded: " + error);
//     }
//   }

//   //Delete file
//   async deleteFile(fileID) {
//     try {
//       return await this.bucket.deleteFile(conf.buckid, fileID);
//       return true;
//     } catch (error) {
//       console.log("Can't be deleted: " + error);
//       return false;
//     }
//   }
//   getFilePreview(fileID) {
//     return this.bucket.getFilePreview(fileID, buckid);
//   }
// }

// const services = new Services();

// export default services;
import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
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
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service()
export default service;