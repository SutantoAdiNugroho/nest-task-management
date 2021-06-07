import * as bcrypt from 'bcrypt';

export const getHashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
};

export const getComparedPassword = async (
  plainPassword: string,
  hashPassword: string,
): Promise<string> => {
  const compared = await bcrypt.compare(plainPassword, hashPassword);

  return compared;
};
