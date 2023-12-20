import CryptoJS from "crypto-js";

// Encrypt
export const ciphertext = (message) => {
  return CryptoJS.AES.encrypt(message, "secret key 123").toString();
};

// Decrypt
export const deciphertext = (message) => {
  var bytes = CryptoJS.AES.decrypt(message, "secret key 123");
  return bytes.toString(CryptoJS.enc.Utf8);
};
