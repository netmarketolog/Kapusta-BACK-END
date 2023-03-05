async function current(req, res, next) {
  const { balance, email } = req.user;

  return res.status(200).json({
    user: {
      email,
      balance,
    },
  });
}

module.exports = {
  current,
};
