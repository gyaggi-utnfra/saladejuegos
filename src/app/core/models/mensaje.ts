import { User } from './user';

export class Mensaje {
  id?: string;
  user?: User;
  fullDate: string = '';
  date: string = '';
  hora: string = '';
  message!: string;
}
