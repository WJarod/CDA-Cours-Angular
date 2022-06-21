import { IUser } from "../Models/IUser";

export class User implements IUser {
    public name!: string;
    public email!: string;
    public password!: string;
    public role!: string;
    public picture!: string;


    public getAllUsers(): IUser[] {
        return [];
    }

    public setUser(user: IUser): void {
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.picture = user.picture;
    }

    public getUserByEmail(email: string): IUser {
        if (this.email == email) {
            return this;
        }else{
            return new User();
        }
    }
}