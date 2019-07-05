const redis = require('redis');

const redisController = {

  async connect(req, res, next) {
    const client = redis.createClient(6379, 'http://localhost');

    client.on('error', (err) => {
      console.error(err);
    });

    client.on('connect', () => {
      console.log('Redis client connected');
    });

    client.set('debounceTimer', 7, redis.print);
    client.get('debounceTimer', (error, result) => {
      if (error) {
        console.log(error);
        throw error;
      }
      console.log(`GET result -> ${result}`);
      res.locals.redis = result;
    });
    next();
  },
};

module.exports = redisController;
