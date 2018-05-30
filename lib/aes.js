'use strict';

const crypto = require('crypto');

var aes = {
  key: '405dca065dbd11e89c2dfa7ae01bbebc',
  iv: '', //ecb mode,  iv mmust be empty string
  clearEncoding: 'utf8',
  cipherEncoding: 'base64'
};
/**
 * aes加密
 * @param key 必须为32位私钥
 * @returns {string}
 */
aes.enc = function (data) {
  var cipher = crypto.createCipheriv('aes-256-ecb', this.key, this.iv);
  cipher.setAutoPadding(true);
  var cipherChunks = [];
  cipherChunks.push(cipher.update(data, this.clearEncoding, this.cipherEncoding));
  cipherChunks.push(cipher.final(this.cipherEncoding));
  return cipherChunks.join('');
}

/**
 * aes解密
 * @param data 待解密内容
 * @param key 必须为32位私钥
 * @returns {string}
 */
aes.dec = function (data) {
  if (!data) {
    return "";
  }
  var decipher = crypto.createDecipheriv('aes-256-ecb', this.key, this.iv);
  decipher.setAutoPadding(true);
  var cipherChunks = [];
  cipherChunks.push(decipher.update(data, this.cipherEncoding, this.clearEncoding));
  cipherChunks.push(decipher.final(this.clearEncoding));
  return cipherChunks.join('');
}

module.exports = aes;
