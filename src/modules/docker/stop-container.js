'use strict';

const docker = require('./docker-context');

const stopContainer = async imageName => {
  return new Promise((resolve, reject) => {
    docker.listContainers(async function(err, containers) {
      if (err) return reject('Error listing containers');
      await Promise.all(
        containers.map(async function(containerInfo) {
          if (containerInfo.Image === imageName) {
            await docker.getContainer(containerInfo.Id).stop();
            await docker.getContainer(containerInfo.Id).remove();
          }
        })
      );
      resolve();
    });
  });
};

module.exports = stopContainer;
