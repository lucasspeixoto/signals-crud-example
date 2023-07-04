export interface User {
  id: number;
  name: string;
  email: string;
  gender: 'M' | 'F';
  tasks: any[];
}
