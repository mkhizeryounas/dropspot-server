# Dropspot Server
Dropspot is an opensource & lightweight continuous delivery service. Install dropspot server on your server or VPS to get started.

# How to install
- Install PM2
- Clone the project in your server
- Edit your ```secret``` and ```api_key``` in ```dropspot-server/ecosystem.config.js``` to a random uuid.
```
cd dropspot-server
nano ecosystem.config.js
```
- Run pm2 server
``` 
pm2 start ecosystem.config.js
```

# Demo project
Refer to ```github/workflows/deployment.yml```
(https://github.com/mkhizeryounas/express)[https://github.com/mkhizeryounas/express]
