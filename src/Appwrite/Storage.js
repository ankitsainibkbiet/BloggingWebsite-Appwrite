import { Client, Storage, ID } from "appwrite";
import config from '../Config/config.js'

export class custumStorage{
    client = new Client();
    storage;

    constructor(){
        this.client
              .setEndpoint(config.appwriteUrl)
              .setProject(config.appwriteProjectId)
        this.storage = new Storage(this.client)
    }

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteStorageId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('appwrite :: uploadFile :: error ',error)
        }
    }

    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(
                config.appwriteStorageId,
                fileId
            )
        } catch (error) {
            console.log('appwrite :: deleteFile :: error ',error )
        }
    }

    getFileView  (fileId){
        try {
            return this.storage.getFileView  (
                config.appwriteStorageId,
                fileId
            )
        } catch (error) {
            console.log('appwrite :: getFileView   :: error ',error)
        }
    }
}

const storage = new custumStorage()

export default storage