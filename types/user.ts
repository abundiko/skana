export type UserModel = {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  phone: string;
  imageUrl?: string;
  verified?: boolean;
  createdAt: string;
  updatedAt: string;
};

export const dummyUsers: UserModel[] = [
  {
    _id: "65a51a8b8b3a8b5a8b5a8b5a",
    username: "abundiko",
    fullname: "Abundance",
    email: "dave.grohl@example.com",
    phone: "+1-202-555-0191",
    imageUrl: "https://randomuser.me/api/portraits/men/43.jpg",
    verified: true,
    createdAt: "2023-11-20T10:30:00.000Z",
    updatedAt: "2023-11-20T10:30:00.000Z",
  },
  {
    _id: "65a51a8b8b3a8b5a8b5a8b5b",
    username: "comfy_0",
    fullname: "Comfort Ologbo",
    email: "taylor.hawkins@example.com",
    phone: "+1-310-555-0182",
    imageUrl: "https://randomuser.me/api/portraits/women/14.jpg",
    verified: false,
    createdAt: "2023-10-15T11:00:00.000Z",
    updatedAt: "2023-11-21T12:00:00.000Z",
  },
  {
    _id: "65a51a8b8b3a8b5a8b5a8b5c",
    username: "krist_novoselic",
    fullname: "Krist Novoselic",
    email: "krist.novoselic@example.com",
    phone: "+1-360-555-0134",
    imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    verified: true,
    createdAt: "2023-09-01T09:00:00.000Z",
    updatedAt: "2023-09-01T09:00:00.000Z",
  },
  {
    _id: "65a51a8b8b3a8b5a8b5a8b5d",
    username: "pat_smear",
    fullname: "Pat Smear",
    email: "pat.smear@example.com",
    phone: "+1-213-555-0147",
    imageUrl: "https://randomuser.me/api/portraits/men/46.jpg",
    verified: true,
    createdAt: "2023-08-12T18:45:00.000Z",
    updatedAt: "2023-11-22T14:20:00.000Z",
  },
  {
    _id: "65a51a8b8b3a8b5a8b5a8b5e",
    username: "chris_shiflett",
    fullname: "Chris Shiflett",
    email: "chris.shiflett@example.com",
    phone: "+1-805-555-0153",
    imageUrl: "https://randomuser.me/api/portraits/men/47.jpg",
    verified: false,
    createdAt: "2023-07-30T08:00:00.000Z",
    updatedAt: "2023-07-30T08:00:00.000Z",
  },
  {
    _id: "65a51a8b8b3a8b5a8b5a8b5f",
    username: "nate_mendel",
    fullname: "Nate Mendel",
    email: "nate.mendel@example.com",
    phone: "+1-206-555-0125",
    imageUrl: "https://randomuser.me/api/portraits/men/48.jpg",
    verified: true,
    createdAt: "2023-06-15T14:00:00.000Z",
    updatedAt: "2023-10-01T10:00:00.000Z",
  },
  {
    _id: "65a51a8b8b3a8b5a8b5a8b6a",
    username: "rami_jaffee",
    fullname: "Rami Jaffee",
    email: "rami.jaffee@example.com",
    phone: "+1-213-555-0199",
    imageUrl: "https://randomuser.me/api/portraits/men/49.jpg",
    verified: true,
    createdAt: "2023-05-02T12:00:00.000Z",
    updatedAt: "2023-05-02T12:00:00.000Z",
  },
];
