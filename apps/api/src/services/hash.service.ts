import bcrypt from "bcrypt";

export const hashService = {
  hash: (value: string): Promise<string> => bcrypt.hash(value, 10),
  compare: (value: string, hash: string): Promise<boolean> =>
    bcrypt.compare(value, hash),
};
