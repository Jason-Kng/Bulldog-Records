function requireApproved(req, res, next) {
  if (req.approvalStatus == "pending") {
    return res.status(403).json({ error: "Seller account approval is pending." });
  }
  else if (req.approvalStatus == "rejected") {
    return res.status(403).json({ error: "Seller account was rejected." });
  }
  else {
    return res.status(403).json({ error: "Cannot use seller account." });
  }
  next();
}

export default requireApproved;