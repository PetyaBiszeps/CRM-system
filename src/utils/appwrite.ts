import { Client, Account, Databases, Storage } from 'appwrite'
import { APP_WRITE_ID } from '@/constants'

export const client = new Client();
export const account = new Account(client);
export const DB = new Databases(client);
export const storage = new Storage(client);

client.setEndpoint('https://cloud.appwrite.io/v1').setProject(APP_WRITE_ID);

export { ID } from 'appwrite';