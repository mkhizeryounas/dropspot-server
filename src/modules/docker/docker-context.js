const Docker = require('dockerode');
const { docker_path } = require('../../../config/keys');

module.exports = new Docker({ socketPath: docker_path });
