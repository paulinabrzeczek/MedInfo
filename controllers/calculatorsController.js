function getCalculatorsPage(req, res) {
    res.render('calculators', { title: 'Kalkulatory Zdrowotne' });
  }
  
  module.exports = { getCalculatorsPage };
  