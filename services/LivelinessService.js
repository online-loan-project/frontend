import BaseService from './BaseService'

let instance = null
class UserService extends BaseService {
  constructor() {
    super('borrower')
  }

  static getInstance() {
    if (!instance) {
      instance = new UserService()
    }
    return instance
  }


  async liveliness(req) {
    return await this._post(`${this._prefix}/liveliness`, req)
  }
}

export default UserService
