async function current(req, res, next) {
  const { user } = req;
  const { email } = user;

  return res.status(200).json({
    data: {
      user: {
        email,
      },
    },
  });
}

module.exports = {
  current,
};