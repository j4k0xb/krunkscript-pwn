import { Handler } from '@netlify/functions';
import { deobfuscate } from '../services/deobfuscate';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handler: Handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  if (!event.body || event.httpMethod !== 'POST') {
    return { statusCode: 400, body: 'Wrong format', headers };
  }

  try {
    return { statusCode: 200, body: deobfuscate(event.body), headers };
  } catch (error: any) {
    console.error(error);
    return { statusCode: 500, body: error.message, headers };
  }
};
