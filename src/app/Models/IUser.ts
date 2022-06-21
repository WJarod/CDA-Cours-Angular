export interface IUser 
{ 
    name: string;
    email: string;
    password: string;
    role: string;
    picture: string;

    setUser(user: IUser): void;
    getAllUsers(): IUser[];
    getUserByEmail(email: string): IUser;
}