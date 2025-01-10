const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();

const r2 = new S3Client({
  // Cloudflare R2 endpoint
  endpoint: process.env.R2_PUBLIC_URL, 
  region: 'auto',  
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
  }
});

module.exports = r2;
