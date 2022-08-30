import bcrypt from 'bcryptjs';

const comparePassword = async (password: string, passwordFromDB: string) => {
  // eslint-disable-next-line no-return-await
  return await bcrypt.compare(password, passwordFromDB);
};

export default comparePassword;
