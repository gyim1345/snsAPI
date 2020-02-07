// const userStore = require('./userStore');

// const checkIdIsRegistered = (data) => {
//     return userStore.userList.find(item => item.name === data.Id) === undefined
//   }

// const checkPassword = (data) => {
//     return userStore.getUserPassword(data.Id) !== data.Password
// }

// performLogin (Id, Password) {
    
//        if (checkIdIsRegistered(Id))  return {statusMessage : 'checkId', loginStatus: false}; 
//        if (checkPassword(Password))  return {statusMessage : 'checkPassword', loginStatus: false};
//         return {statusMessage: 'LoggedIn', loginStatus: true}
//       }

// const onSubmit = data => {
//     console.log(userStore.userList.find(item => item.name === data.Id) === undefined)
//       checkIdIsRegistered(data)
//         ? alert("check id") 
//         : checkPassword(data)
//           ? alert("check password") 
//           : performLogIn(data);
//   };