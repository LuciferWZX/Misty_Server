/**
 *目的就是增强数据的安全性！
 *我们在软件开发过程中，对于如密码这样的信息，我们不能直接以明文的方式存储在数据库中。
 *若数据库被入侵，用户的密码明文泄露，则可能会造成不可避免的损失。
 *所以，对于类似密码这样的数据，我们是需要加密处理的，这样即便数据泄露，被加密的密码也难以破解。
 *而bcrypt就是一种不可逆的加密算法，无法通过解密密文得到明文。
 */
/**
 * todo
 * 同步
 * @param password
 */
export function enCrypt(password: string | number): string {
  const bcrypt = require('bcrypt');
  // 随机字符串
  const salt = bcrypt.genSaltSync(10);
  //返回加密后的结果
  return bcrypt.hashSync(password, salt);
}

/**
 * todo
 * 进行
 * @param password 明文
 * @param enCryptPassword 暗文
 */
export function enCryptCompare(
  enCryptPassword: string | number,
  password: string,
): boolean {
  const bcrypt = require('bcrypt');
  return bcrypt.compareSync(password, enCryptPassword);
}

/**
 * todo 获取文件后缀
 * @param fileName
 */
export function getFileSuffix(fileName: string) {
  const index = fileName.lastIndexOf('.');
  return fileName.substr(index + 1);
}
