
class Renderer {
  constructor(callname = null, specialUser = false){
    this.callname = callname;
    this.specialUser = specialUser;
  }
  
  messagePage(res, message){
    res.render("message_page", {
      callname: this.callname,
      specialUser: this.specialUser,
      message,
    });
  }

  account(res){
    res.render("account", {
      callname: this.callname,
      specialUser: this.specialUser,
    });
  }

  login(res, failMsg = null){
    res.render("login", {
      callname: this.callname,
      specialUser: this.specialUser,
      failMsg,
    });
  }

  signup(res, failMsg = null){
    res.render("signup", {
      callname: this.callname,
      specialUser: this.specialUser,
      failMsg,
    });
  }

  render(res, pageName){
    res.render(pageName, {
      callname: this.callname,
      specialUser: this.specialUser,
    });
  }
}

module.exports = {
  Renderer,
};