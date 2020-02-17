const Mail = use('Mail');

class UserRegister {
  static get key() {
    return 'UserRegister-key';
  }

  async handle(job) {
    const { data } = job; // the 'data' variable has user data

    await Mail.send('emails.auth.register', { confirm: data.url }, message => {
      message
        .to(data.email)
        .from('before@before.com.br', 'BeforeTI')
        .subject('Ative sua conta.');
    });

    return data;
  }
}

module.exports = UserRegister;
