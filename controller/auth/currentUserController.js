async function current(req, res, next) {
  const { balance, email, token } = req.user;

  return res.status(200).json({
      user: {
        email,
        balance,
      },
      token,
  });
}

module.exports = {
  current,
};

