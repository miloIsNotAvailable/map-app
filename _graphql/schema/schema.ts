import fs from 'fs'
import path from 'path'
import { buildSchema } from 'graphql'

const schemaPath = path.join( process.cwd(), "/_graphql/schema/graphql-schema.graphql" )
const readSchema = fs.readFileSync( schemaPath, "utf-8" )

export const schema = buildSchema( readSchema )