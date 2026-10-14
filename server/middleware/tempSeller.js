// since auth and login are not yet implemented, use sellerID 1
// this file should be replaced with actual auth and login logic

function tempSeller(req, res, next) {
  req.sellerID = 1;
  next()
}

module.exports = tempSeller;