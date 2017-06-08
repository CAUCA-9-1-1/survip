
export class Password {
  private numbers = '0123456789';
  // private specials = '!@#$%^&*()_+{}:"<>?\|[];\',./`~';
  private specials = '!@#$%^&*()_+{}:"<>?\|[];\',./`~';
  private lowercase = 'abcdefghijklmnopqrstuvwxyz';
  private uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  public generate(): string {
    let password = '';

    password += this.specials.pick(1);
    password += this.lowercase.pick(1);
    password += this.uppercase.pick(1);
    password += (this.specials + this.lowercase + this.uppercase + this.numbers).pick(1);

    return password.shuffle();
  }

  public quality(password: string): number {
    if (!password) {
      return 0;
    }

    let score = 0;
    const uniqueLetters = new Object();

    for (let i = 0; i < password.length; i++) {
      uniqueLetters[password[i]] = (uniqueLetters[password[i]] || 0) + 1;
      score += 5.0 / uniqueLetters[password[i]];
    }

    const regexSpecial = new RegExp('[' + this.specials.replace(']', '\\]') + ']');
    const checks = {
      digits: /\d/.test(password),
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      specials: regexSpecial.test(password),
      nonWords: /\W/.test(password)
    };

    for (const i in checks) {
      if (checks[i]) {
        score += (checks[i] === true ? 10 : 0);
      }
    }

    return score;
  }
}
