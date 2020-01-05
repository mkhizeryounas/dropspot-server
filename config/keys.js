if (process.env.NODE_ENV === 'production') require('dotenv').config();
module.exports = {
  secret: process.env.secret || '92cc13d9-fb39-46d5-a428-6698f4a8b5bd',
  api_key: process.env.api_key || '5e34d2a6-a11a-4656-948c-cd2840661f0d',
  docker_path: process.env.docker_path || '/var/run/docker.sock'
};
