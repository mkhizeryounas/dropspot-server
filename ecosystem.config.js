module.exports = {
  apps: [
    {
      name: 'Dropspot-CD',
      script: './bin/www',
      env: {
        NODE_ENV: 'production',
        TZ: 'UTC',
        PORT: 8080
      }
    }
  ]
};
