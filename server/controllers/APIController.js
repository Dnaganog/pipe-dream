const googleTrends = require('google-trends-api');

const APIController = {
  getAPI(req, res, next) {
    googleTrends.relatedQueries(req.body)
      .then((results) => {
        res.locals.payload = JSON.stringify(JSON.parse(results).default.rankedList.map(listItem => listItem.rankedKeyword.map(keyword => keyword.query))[0]);
        return next();
      })
      .catch((err) => {
        console.error('Oh no there was an error', err);
      });
  },
};

module.exports = APIController;
