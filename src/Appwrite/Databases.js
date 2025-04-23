import { Client, Databases, Query } from "appwrite";
import config from "../Config/config";

export class custumDatabases {
    client = new Client()
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title, slug, content, featuredImage, status, userId
                }
            )
        } catch (error) {
            console.log('appwrite error :: createPost :: error ', error)
            throw error
        }
    }

    async updatePost(slug , { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title, slug, content, featuredImage, status
                }
            )
        } catch (error) {
            console.log('appwrite error :: updatePost :: error', error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log('appwrite error :: deletePost :: error',error)
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log('appwrite error :: getPost :: error',error)
        }
    }

    async getActivePosts(queries = [Query.equal('status','active')]){  // first set index in database for query 
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log('appwrite error :: getActivePost :: error',error)
        }
    }
}

const databases = new custumDatabases()

export default databases