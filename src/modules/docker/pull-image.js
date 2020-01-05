'use strict';

const docker = require('./docker-context');

const pullImage = async (
  imageUrl,
  username = '',
  password = '',
  serveraddress = ''
) => {
  console.log(imageUrl, username, password, serveraddress);
  return new Promise((resolve, reject) => {
    const auth = {
      username,
      password,
      serveraddress
    };
    docker.pull(imageUrl, { authconfig: auth }, function(err, stream) {
      if (err) {
        console.log('Err', err);
        return reject({
          statusCode: 400,
          message: 'Image could not be pulled from the registery.'
        });
      }
      docker.modem.followProgress(stream, onFinished, onProgress);
      console.log('Docker pull');
      function onFinished(err, output) {
        console.log('output', output, err);
        if (err) return reject(err);
        return resolve(output);
      }
      function onProgress(event) {
        console.log(event);
      }
    });
  });
};

module.exports = pullImage;
