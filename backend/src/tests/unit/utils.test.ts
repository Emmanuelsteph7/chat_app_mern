import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import jwt from 'jsonwebtoken';
import { comparePassword, generateToken } from '../../utils';

// this is used to get the env values from .env.test
dotenv.config({ path: path.resolve(__dirname, '../../../.env.test') });

describe('utils', () => {
  describe('comparePassword', () => {
    it('should return true when the password matches', async () => {
      const passwordFromUser = '123';
      const encryptedPwd = await bcrypt.hash(passwordFromUser, 10);
      const isMatch = await comparePassword(passwordFromUser, encryptedPwd);

      expect(isMatch).toBeTruthy();
    });

    it('should throw error when the password does not match', async () => {
      const passwordFromUser = '123';
      const incorrectPassword = '234';
      const encryptedPwd = await bcrypt.hash(passwordFromUser, 10);
      const isMatch = await comparePassword(incorrectPassword, encryptedPwd);

      expect(isMatch).toBe(false);
    });
  });

  describe('generateToken', () => {
    it('should generate JWT token when the id is passed', () => {
      const idPassed = '123';
      const generatedToken = generateToken(idPassed);
      const decoded = jwt.verify(generatedToken, process.env.JWT_SECRET || '');

      expect(generateToken).toBeTruthy();
      expect(decoded).toMatchObject({ id: '123' });
    });
  });
});
