const userStore = require('../repository/userStore')

  const register = {

  async userIdValidation(id) {
    let regExp = /\b^[A-Za-z0-9.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$\b/
    return regExp.test(id);
  },

  async userIdAvailability(id) {
    return await userStore.checkIdIsRegistered(id)
  },

  async registration(id, password) {
    return await userStore.createUser(id, password)
  },
  
  // async Registration(id, password) {
  //   let regExp = /[a-zA-Z0-9@]$/
  //   if (!regExp.test(id)) {
  //     return { Message: "Check Input", status: false }
  //   }
  //   // TODO: validation 하는것은 따로 빼고 
  //   // return 도 저렇게 보내지 말고 status 코드로 보내던가 아니면 notfound 등으로 보내던가 예제 주신거 다시 봐서 적용
  //   // catch error 에 error을 상태별로 만들어 그에 따라 변환 할 수 있게끔 만들던가
  //   // userStore 을 userRepository 로 바꾸도록.
  //   const idRegisterd = await userStore.checkIdIsRegistered(id)
  //   if (!idRegisterd) {
  //     return { Message: "Check Input", status: false }
  //   }

  //   await userStore.createUser(id, password)
  //   return { Message: "Registered", status: true }
  // }
}

module.exports = register;
