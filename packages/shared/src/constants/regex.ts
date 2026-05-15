export const Regex = {
  PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  NAME: /^[A-Z][a-z]{1,24}$/,
  USERNAME: /^(?=.{3,20}$)[a-zA-Z][a-zA-Z0-9]*(?:[._][a-zA-Z0-9]+)*$/,
  COUNTRY: /^[a-zA-Z\s]{2,50}$/,
  PHONE: /^$|^[+]?[\d\s\-()]{7,20}$/,
  TOKEN: /^[a-fA-F0-9]{64}$/,
};
