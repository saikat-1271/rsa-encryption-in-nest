import * as forge from 'node-forge';
import * as CryptoJS from 'crypto-js';
import * as utf8 from 'utf8';

export const AESEncrypt = (id: number) => {
  const text = 'saikat';
  id = CryptoJS.MD5(utf8.encode(id)).toString(CryptoJS.enc.Hex);
  const cipher = forge.cipher.createCipher(
    'AES-CBC',
    forge.util.createBuffer(id),
  );
  // const iv = forge.random.getBytesSync(16);
  cipher.start({ iv: "" });
  cipher.update(forge.util.createBuffer(text));
  cipher.finish();
  const encrypted = cipher.output;
  return forge.util.encode64(encrypted.getBytes());
};

export const AESDecrypt = (text: string, id: number) => {
  id = CryptoJS.MD5(utf8.encode(id)).toString(CryptoJS.enc.Hex);
  const cipher = forge.cipher.createDecipher(
    'AES-CBC',
    forge.util.createBuffer(id),
  );

  const iv = forge.random.getBytesSync(16);
  cipher.start({ iv: iv });
  cipher.update(forge.util.createBuffer(text));
  cipher.finish();
  const decrypted = cipher.output;

  // const decodedBytes = Buffer.from(decrypted, 'hex');

  // const decodedString = decodedBytes.toString('base64');

  return decrypted.data;
};
