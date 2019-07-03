const googleTrends = require('google-trends-api');

const googleTrendsController = {
  getAPI(req, res, next) {
    googleTrends.interestOverTime({ keyword: 'Women\'s march' })
      .then((results) => {
        console.log('These results are awesome', results);
        res.locals.payload = results;
        return next();
      })
      .catch((err) => {
        console.error('Oh no there was an error', err);
      });
  },
};

module.exports = googleTrendsController;
