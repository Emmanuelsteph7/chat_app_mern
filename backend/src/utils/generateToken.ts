import jwt from 'jsonwebtoken';

// to create, send and save jwt token in the cookie.
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || '', {
    expiresIn: '30d',
  });
};

export default generateToken;
