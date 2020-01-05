'use strict';

const docker = require('./docker-context');

const createAndRunContainer = async (
  imageName,
  toExposePort = '3000/tcp',
  port = '5000'
) => {
  console.log(imageName);

  let PortBindings = {};

  PortBindings[toExposePort] = [
    {
      HostPort: port
    }
  ];

  return new Promise((resolve, reject) => {
    docker
      .run(
        imageName,
        [],
        process.stdout,
        {
          ExposedPorts: {},
          Hostconfig: {
            PortBindings
          }
        },
        function(err, data, container) {
          if (err) return reject(err);
          console.log('container', container);
          console.log('container data', data);
          return resolve(data);
        }
      )
      .on('container', function(container) {
        console.log('on container', container);
        return resolve(container);
      });
  });
};

module.exports = createAndRunContainer;
