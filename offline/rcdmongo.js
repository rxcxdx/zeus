import { MongoClient } from 'mongodb'

export default async function rcdmongo() {
  const client = new MongoClient('mongodb://localhost:27017')
  await client.connect()
  const db = client.db('app_database')
  const collection = db.collection('vendas')
  return { client, db, collection }
}
