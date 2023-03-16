import * as forge from 'node-forge';
import * as CryptoJS from 'crypto-js';
import * as utf8 from 'utf8';
import * as fs from 'fs';
export class EncryptionHelper {
  public static MD5Encryption(text: string, key: string) {
    key = CryptoJS.MD5(utf8.encode(key)).toString(CryptoJS.enc.Latin1);
    key = key + key.substring(0, 8);
    const cipher = forge.cipher.createCipher(
      '3DES-ECB',
      forge.util.createBuffer(key, 'utf-8' as any),
    );

    cipher.start({ iv: '' });
    cipher.update(forge.util.createBuffer(text, 'utf-8' as any));
    cipher.finish();
    const encrypted = cipher.output;

    return forge.util.encode64(encrypted.getBytes());
  }

  public static MD5Decryption(text: string, key: string) {
    key = CryptoJS.MD5(utf8.encode(key)).toString(CryptoJS.enc.Latin1);
    key = key + key.substring(0, 8);
    const cipher = forge.cipher.createDecipher(
      '3DES-ECB',
      forge.util.createBuffer(key, 'utf-8' as any),
    );

    cipher.start({ iv: '' });
    text = forge.util.decode64(text);
    cipher.update(forge.util.createBuffer(text, 'utf-8' as any));
    cipher.finish();
    const decrypted = cipher.output;

    return decrypted.data;
  }

  public static AESEncrypt(text: string, key: string) {
    text = fs.readFileSync('src/encryptionFunction/threemb.json').toString();
    const starten = performance.now();

    key = CryptoJS.MD5(utf8.encode(key)).toString(CryptoJS.enc.Hex);
    const cipher = forge.cipher.createCipher(
      'AES-CBC',
      forge.util.createBuffer(key),
    );

    const iv = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    cipher.start({ iv: iv });
    cipher.update(forge.util.createBuffer(text));
    cipher.finish();
    const encrypted = cipher.output;
    const enden = performance.now();
    console.log('Encrypt', enden - starten);

    // ************** return
    return forge.util.encode64(encrypted.getBytes());

    // console.log(text);
    
    const startde = performance.now();

    key = CryptoJS.MD5(utf8.encode(key)).toString(CryptoJS.enc.Hex);
    // key = '4b5ffcdaf38ce4d463171f5c977c5ab3';
    // console.log(key);

    const decipher = forge.cipher.createDecipher(
      'AES-CBC',
      forge.util.createBuffer(key),
    );
    // const iv = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    decipher.start({ iv: iv });
    text = forge.util.decode64(text);
    decipher.update(forge.util.createBuffer(text));
    decipher.finish();
    const decrypted = cipher.output;
    const endde = performance.now();
    console.log('Decrypt', endde - startde);

    console.log('total', endde - startde + enden - starten);

    console.log(decrypted.data);

    return decrypted;
  }

  public static AESDecrypt(text: string, key: string): string {
    const starten = performance.now();

    key = CryptoJS.MD5(utf8.encode(key)).toString(CryptoJS.enc.Hex);
    // key = '4b5ffcdaf38ce4d463171f5c977c5ab3';
    console.log(key);

    const cipher = forge.cipher.createDecipher(
      'AES-CBC',
      forge.util.createBuffer(key),
    );
    const iv = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    cipher.start({ iv: iv });
    text = forge.util.decode64(text);
    cipher.update(forge.util.createBuffer(text));
    cipher.finish();
    const decrypted = cipher.output;
    const enden = performance.now();
    console.log('Decrypt', enden - starten);
    return decrypted.data;
  }
}
