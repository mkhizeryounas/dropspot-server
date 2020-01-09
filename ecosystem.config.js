module.exports = {
  apps: [
    {
      name: 'Dropspot-CD',
      script: './bin/www',
      env: {
        NODE_ENV: 'production',
        TZ: 'UTC',
        PORT: 8080,
        secret: '92cc13d9-fb39-46d5-a428-6698f4a8b5bd',
        api_key: '5e34d2a6-a11a-4656-948c-cd2840661f0d',
      }
    }
  ]
};
