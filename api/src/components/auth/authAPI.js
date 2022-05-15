const express = require('express');
const router = express.Router();
const AuthService = require('./authService');
const UserService = require('../users/usersService');
const AuthSchema = require('./authSchemas');
const joiValidator = require('../../middleware/joiValidator');
const { defaultProfile, responseMsg } = require('../../../constants');
const bcrypt = require('../../helpers/bcrypt');
const jwt = require('../../helpers/jwt');

router.post('/signup', joiValidator(AuthSchema.signup), async (req, res) => {
  const { dni, name, lastName, email, username, password } = req.body;
  const hashedPassword = await bcrypt.hashPassword(password);

  try {
    const user = {
      dni,
      name,
      lastName,
      email,
    };

    const auth = {
      idUser: dni,
      username,
      password: hashedPassword,
      idProfile: defaultProfile.BASIC,
    };

    const exist = await AuthService.existUsernameOrDni(dni, username);
    if (exist) {
      res.status(500).json({ message: 'The username or dni already exist' });
    }

    await UserService.add(user);
    await AuthService.add(auth);

    res.status(201).json({ message: 'User added sucessfully', user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: responseMsg.INTERNAL_ERROR });
  }
});

router.post('/signin', joiValidator(AuthSchema.signin), async (req, res) => {
  try {
    const { username, password } = req.body;

    const auth = await AuthService.auth(username, password);

    const token = jwt.generateToken(auth);

    await AuthService.updateToken(auth.idUser, auth.username, token);

    res.status(200).json({
      accessToken: token,
      basicData: auth,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: responseMsg.INTERNAL_ERROR });
  }
});

module.exports = router;
