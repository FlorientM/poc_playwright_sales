import dotenv from 'dotenv';

async function globalSetup() {

  if(process.env.context) {
    dotenv.config({
      path: `envs/.env.${process.env.context}`,
      override: true
    });
  } else {
    dotenv.config({
      path: `envs/.env.lmfr-uat`,
      override: true
    });
  }
}
  
module.exports = globalSetup;