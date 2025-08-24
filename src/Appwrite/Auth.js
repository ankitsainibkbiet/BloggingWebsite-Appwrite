import { Client, Account, ID } from "appwrite";
import config from '../Config/config.js'

// we make class because it make us easy to access methods by object of the class and we can also make as free from vendor lock-in problem 


export class AuthService {
    client = new Client();
    account;

    constructor() { // to utilies properly when the obj is created 
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return await this.userLogin({email, password})  // does not returning anything make error
            } else {
                console.log('userAccount not created')
                return null
            }
        } catch (error) {
            throw(error)  // Rethrows the error for the caller to handle
        }
    }

    async userLogin({ email, password }) {
        try {
            const userLogin = await this.account.createEmailPasswordSession(email, password)
            if (userLogin) {
                return userLogin
            } else {
                console.log('error in login')
                return null
            }
        } catch (error) {
            console.log('appwrite error :: userLogin : error ', error)
            throw(error)
        }
    }

    async getCurrentUser() {
        try {
            const user = this.account.get();
            return user
        } catch (error) {
            console.log('appwrite error :: getCurrentUser :: error ', error)
        }
    }

    async userLogout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log('appwrite error :: userLogout :: error ', error)
        }
    }
}

const authService = new AuthService()

export default authService