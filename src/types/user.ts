export interface User {
    id: string;
    name: string;
    email: string;
    address: string;
    birthdate: string;
    image: string;
  }
  
  export type UserInput = Omit<User, "id" | "image">;
  