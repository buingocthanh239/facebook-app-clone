import { Gender } from 'src/common/enum/commom';

export interface ILoginData {
  email: string;
  password: string;
}

export interface INameScreenForm {
  firstname: string;
  lastname: string;
}

export interface IEmailScreenForm {
  email: string;
}

export interface IGenderScreenForm {
  gender: Gender;
}

export interface IPasswordScreenForm {
  password: string;
}

export interface IVerifyOtpSceenForm {
  otpCode: string;
}
