  // import conf from "../conf/conf.js";
  // import { Client, Account ,Permission,Role, ID} from "appwrite";

  // export class Authservice {
  //   client = new Client();
  //   account;

  //   constructor() {
  //     this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projid);
  //     this.account = new Account(this.client);
  //   }

  //   //Register
  //   async createAccount({ email, password, name}) {
  //     const userId=ID.unique();
  //     try {
       
  //       const user = await this.account.create(
  //         userId, // Generate a unique ID
  //         email,
  //         password,
  //         name,
  //         [
  //           // Grant basic permissions to the user
  //           Permission.read(Role.users(["verified"])), // Read own user data
  //           Permission.update(Role.users(["verified"])), 
  //           Permission.write(Role.users(["verified"])),
  //           Permission.delete(Role.users(["verified"])),// Update own user data
  //           Permission.create(Role.users(["verified"])),// Update own user data

  //           // Add additional permissions as needed
  //           // (e.g., create documents in specific collections)
  //         ]
  //       );
  //       if (user) {
  //         // Handle successful account creation with permissions
  //         return await this.loginAccount({ email, password });
  //       } else {
  //         console.error("Error creating account:", user);
  //         throw new Error("Account creation failed.");
  //       }
  //     } catch (error) {
  //       console.error("Error in createAccount:", error);
  //       throw error;
  //     }
  //   }
  //   //Login
  //   async loginAccount({ email, password }) {
  //     try {
  //       const session = await this.account.createEmailPasswordSession(email, password);
  //       console.log("Login successful, session:", session);
  //       return session;
  //     } catch (error) {
  //       console.error("Error in loginAccount:", error);
  //       throw error;
  //     }
  //   }
  //   //State Chk and getting user
  //   async getUser() {
  //     try {
  //       const user = await this.account.get();
  //       console.log("User retrieved:", user);
  //       return user;
  //     } catch (error) {
  //       console.log("Appwrite serive :: getUser :: error", error);
  //       return null;
  //     }
  //   }
  //   //logut
  //   async logout() {
  //     try {
  //       const result = await this.account.deleteSessions();
  //       console.log("Logout successful:", result);
  //       // No need to recreate the client instance here
  //       return result;
  //     } catch (error) {
  //       console.error("Error in logout:", error);
  //       throw error;
  //     }
  //   }
  // }

  // const authservice = new Authservice();

  // export default authservice;


  import conf from '../conf/conf.js';
  import { Client, Account, ID } from "appwrite";
  
  
  export class AuthService {
      client = new Client();
      account;
  
      constructor() {
          this.client
              .setEndpoint(conf.appwriteUrl)
              .setProject(conf.appwriteProjectId);
          this.account = new Account(this.client);
              
      }
  
      async createAccount({email, password, name}) {
          try {
              const userAccount = await this.account.create(ID.unique(), email, password, name);
              if (userAccount) {
                  // call another method
                  return this.login({email, password});
              } else {
                 return  userAccount;
              }
          } catch (error) {
              throw error;
          }
      }
  
      async login({email, password}) {
          try {
              return await this.account.createEmailPasswordSession(email, password);
          } catch (error) {
              throw error;
          }
      }
  
      async getCurrentUser() {
          try {
              return await this.account.get();
          } catch (error) {
              console.log("Appwrite serive :: getCurrentUser :: error", error);
          }
  
          return null;
      }
  
      async logout() {
  
          try {
              await this.account.deleteSessions();
          } catch (error) {
              console.log("Appwrite serive :: logout :: error", error);
          }
      }
  }
  
  const authService = new AuthService();
  
  export default authService
  
  