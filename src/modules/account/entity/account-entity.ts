export class AccountEntity {
  id: string;
  username: string;
  nickname: string;
  email: string;
  phone: string;
  token: string;
  avatar: string;
  authority: {
    id: string;
    name: string;
    description: string;
    level: number;
  };
}
