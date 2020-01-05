'use strict';

const docker = require('./docker-context');

const getImage = async imageUrl => {
  return docker.getImage(imageUrl);
};

module.exports = getImage;
