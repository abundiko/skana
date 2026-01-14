import { UserModel } from "./user";

export type TransactionModel = {
  _id: string;
  from: string;
  to: string;
  amount: number;
  method: "qr" | "username";
  type: "funds-sent" | "funds-receive" | "funds-reversed";
  status: "success" | "failed" | "pending" | "reversed";
  createdAt: string;
  updatedAt: string;
};

export type TransactionModelPopulated = Omit<
  TransactionModel,
  "from" | "to"
> & {
  from: UserModel;
  to: UserModel;
};

export const dummyTransactions: TransactionModel[] = [
  {
    _id: "65a51a8b8b3a8b5a8b5a8b5a",
    from: "65a51a8b8b3a8b5a8b5a8b5a",
    to: "65a51a8b8b3a8b5a8b5a8b5e",
    amount: 100,
    method: "qr",
    type: "funds-sent",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "success",
  },
  {
    _id: "65a51a8b8b3a8b5a8b5a8b5b",
    from: "65a51a8b8b3a8b5a8b5a8b5a",
    to: "65a51a8b8b3a8b5a8b5a8b5d",
    amount: 200,
    method: "username",
    type: "funds-receive",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "failed",
  },
  {
    _id: "65a51a8b8b3a8b5a8b5a8b5c",
    from: "65a51a8b8b3a8b5a8b5a8b5a",
    to: "65a51a8b8b3a8b5a8b5a8b5d",
    amount: 300,
    method: "qr",
    type: "funds-reversed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "reversed",
  },
  {
    _id: "65a51a8b8b3a8b5a8b5a8b5e",
    from: "65a51a8b8b3a8b5a8b5a8b5d",
    to: "65a51a8b8b3a8b5a8b5a8b5a",
    amount: 400,
    method: "username",
    type: "funds-sent",
    createdAt: "2023-08-12T18:45:00.000Z",
    updatedAt: "2023-11-22T14:20:00.000Z",
    status: "pending",
  },
  {
    _id: "65a51a8b8b3a8b5a8b5a8b5f",
    from: "65a51a8b8b3a8b5a8b5a8b5d",
    to: "65a51a8b8b3a8b5a8b5a8b5b",
    amount: 500,
    method: "qr",
    type: "funds-receive",
    createdAt: "2023-08-12T18:45:00.000Z",
    updatedAt: "2023-11-22T14:20:00.000Z",
    status: "success",
  },
];
