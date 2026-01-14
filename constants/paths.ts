import { buildUrlQuery } from "@/functions/helpers";

export const paths = {
  index: "/",

  onboard1: "/onboard",
  onboard2: "/onboard/second",
  onboard3: "/onboard/third",

  register: "/auth/register",
  registerPhone: "/auth/register/phone",
  registerPhoneVerify: "/auth/register/phone-verify",
  registerCreatePin: "/auth/register/create-pin",
  registerDetails: "/auth/register/details",
  registerVerify: "/auth/register/verify",
  registersuccess: "/auth/register/success",

  registerVerifyNIN: "/auth/register/verify/nin",

  login: "/auth/login",
  loginSaved: "/auth/login/saved-login",
  loginFresh: "/auth/login/fresh-login",
  loginFreshVerify: "/auth/login/fresh-login-verify",

  forgotPassword: "/auth/forgot-password",
  forgotPasswordVerify: "/auth/forgot-password/verify",
  forgotPasswordCreatePassword: "/auth/forgot-password/create-password",

  home: "/home",
  homeTransactions: "/home/transactions",
  homeWallet: "/home/wallet",
  homeProfile: "/home/profile",

  transactionSingle: (id: string) =>
    `/home/single-transaction${buildUrlQuery({ id })}` as "/home/single-transaction",
} as const;
