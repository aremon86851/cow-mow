export type IUserProfile = {
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  password: string;
  role: string;
  address: string;
  budget?: number;
  income?: number;
};
