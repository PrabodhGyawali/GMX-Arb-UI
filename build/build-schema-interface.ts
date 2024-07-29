import axios from 'axios'
import {promises as fs} from 'fs'

// types.ts
interface SchemaField {
  name: string;
  type: string;
  nullable: boolean;
}

function mapToTypeScriptType(type: string, nullable: boolean): string {
  let tsType: string;
  switch (type) {
    case 'TEXT':
    case 'VARCHAR':
    case 'CHAR':
      tsType = 'string';
      break;
    case 'INTEGER':
    case 'REAL':
    case 'NUMERIC':
      tsType = 'number';
      break;
    case 'BOOLEAN':
      tsType = 'boolean';
      break;
    case 'BLOB':
      tsType = 'Buffer';
      break;
    case 'DATE':
    case 'DATETIME':
    case 'TIMESTAMP':
      tsType = 'Date';
      break;
    default:
      tsType = 'any';
  }
  return nullable ? `${tsType} | null` : tsType;
}

// Get the trades Schema
async function fetchSchema() {
  try {
    const response = await axios.get('http://127.0.0.1:5000/trades/schema');  // TODO: Development env
    const schemaString: string = response.data[0][0];
    const schemaFields: SchemaField[] = parseSchema(schemaString);
    console.log(schemaFields);

    return schemaFields;
  } catch (error) {
    console.error('Error fetching schema: ', error);
    return [];
  }
}
/**
 * Takes a SQL Schema and converts each field line definitions into a String Array
 * Check whether the String Array includes 'NOT NULL' and replace with '!NULL'
 * First Two elements of String Array is the fieldName and fieldType
 * 
 * @param schemaString 
 * @returns SchemaField[]
 */
function parseSchema(schemaString: string): SchemaField[]{
  let schemaFields: SchemaField[] = [];
  const field_lines = schemaString.split('\n').slice(1, -1)
    .map( line => line.trim()
                    .slice(0, -1)
                    .replace("NOT NULL", "!NULL")
                    .split(' ')) // get rid of comma at end
  field_lines.forEach(fieldDefinition => {
    let schemaField: SchemaField = {
      name: fieldDefinition[0],
      type: fieldDefinition[1],
      nullable: !fieldDefinition.includes('!NULL'),
    };
    schemaFields.push(schemaField)
  });
  return schemaFields;
} 

function generateInterface(schema: SchemaField[]): string {
  const fields = schema.map( field => {
    const tsType = mapToTypeScriptType(field.type, field.nullable);
    return `  ${field.name}: ${tsType};`;
  }).join('\n');
  
  return `export default interface PositionSchemaType {\n${fields}\n}`;
}

async function generateSchemaInterface(): Promise<string> {
  const schema = await fetchSchema();
  return generateInterface(schema);
}

/**
 * Write the output of `generateScehemaInterface()` to a ts file.
 */
async function main() {
  const interfaceDefinition = await generateSchemaInterface();
  console.log(interfaceDefinition);
  
  try {
    await fs.writeFile(`./TradeMonitorInterface.ts`, interfaceDefinition);
    console.log("Schema Interface written in build/");
  } catch(error) {
    console.error("Error writing interface to file: ");
  }
}

main();
