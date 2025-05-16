import CryptoJS from 'crypto-js'

export const useEncryptPassword = () => {
  const encrypt = (password) => {
    const data = CryptoJS.AES.encrypt(password, process.env.ENCRYPTION_KEY).toString()
    console.log(data)
    return data
  }

  return {
    encrypt
  }
}
