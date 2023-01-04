import { HttpException } from '@exceptions/HttpException';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class AuthService {
  public users = userModel;

  public async authenticate(address: string) {
    if (isEmpty(address)) throw new HttpException(400, 'Address is empty');

    const findUser = await this.users.findOne({ address });
    // if (findUser) throw new HttpException(409, `This email ${address} already exists`);
    if (findUser) return findUser;
    const createUserData = await this.users.create({ address: address });

    return createUserData;
  }

  // public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: User }> {
  //   if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

  //   const findUser: User = await this.users.findOne({ email: userData.email });
  //   if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

  //   const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
  //   if (!isPasswordMatching) throw new HttpException(409, "Password is not matching");

  //   const tokenData = this.createToken(findUser);
  //   const cookie = this.createCookie(tokenData);

  //   return { cookie, findUser };
  // }

  // public async logout(userData: User): Promise<User> {
  //   if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

  //   const findUser: User = await this.users.findOne({ email: userData.email, password: userData.password });
  //   if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

  //   return findUser;
  // }

  // public createToken(user: User): TokenData {
  //   const dataStoredInToken: DataStoredInToken = { _id: user._id };
  //   const secretKey: string = SECRET_KEY;
  //   const expiresIn: number = 60 * 60;

  //   return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  // }

  // public createCookie(tokenData: TokenData): string {
  //   return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  // }
}

export default AuthService;
