const { User } = require('../../models/userModel');
const queryString = require('querystring');
const axios = require('axios');
const jwt = require('jsonwebtoken');

async function googleRedirect(req, res) {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });
  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });
  const { email } = userData.data;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ email, verificationToken: null, verify: true });
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
  await user.updateOne({ token });

  const { createdAt } = user;
  return res.redirect(
    `${process.env.FRONTEND_URL}?token=${token}&email=${email}&createdAt=${createdAt}`
  );
    
}

module.exports = {
  googleRedirect,
};
