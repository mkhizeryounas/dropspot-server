const express = require('express');
const router = express.Router();
const locker = require('../src/modules/locker');
const Joi = require('@hapi/joi');
const { api_key } = require('../config/keys');
const {
  pullImage,
  createAndRunContainer,
  getImage,
  stopContainer
} = require('../src/modules/docker');

const schema = Joi.object()
  .keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    serveraddress: Joi.string().required(),
    imageUrl: Joi.string().required(),
    port: Joi.string().required()
  })
  .unknown(true);

router.get('/', function(req, res, next) {
  res.reply({ message: 'Dropspot continuous delivery service' });
});

router.post('/generate-deployment-key', async function(req, res, next) {
  try {
    if (req.headers['x-api-key'] !== `Bearer ${api_key}`) {
      throw { status: 401 };
    }
    let obj = await schema.validateAsync(req.body);
    let deployment_token = locker.lock(obj);
    res.reply({ data: deployment_token });
  } catch (err) {
    console.log('Err', err);
    next(err);
  }
});

router.post('/trigger-deployment', locker.unlock, async function(
  req,
  res,
  next
) {
  try {
    const opts = await schema.validateAsync(req.user);
    console.log('opts', opts);
    try {
      await stopContainer(opts.imageUrl);
      let image = await (await getImage(opts.imageUrl)).remove();
      console.log(image);
    } catch (err) {}
    let imageData = await pullImage(
      opts.imageUrl,
      opts.username,
      opts.password,
      opts.serveraddress
    );
    console.log('imageData', imageData);
    let toRunImage = await (await getImage(opts.imageUrl)).inspect();
    let toExposePort = Object.entries(
      toRunImage.ContainerConfig.ExposedPorts
    ).map(([key, value]) => key)[0];
    console.log('toExposePort', toExposePort, opts.port);

    let constiner = await createAndRunContainer(opts.imageUrl, toExposePort, opts.port);
    res.reply({ data: { id: constiner.id } });
  } catch (err) {
    console.log('Err', err);
    next(err);
  }
});

module.exports = router;
