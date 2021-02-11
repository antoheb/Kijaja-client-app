export interface IUser {
    firstName: string,
    lastName: string,
    token: string,
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword?: string;
}

export interface IUserFormValues extends Partial<IUser>
{
    email: string;
    password: string;
    confirmPassword?: string;
}

export class UserFormValues implements IUserFormValues
{
    email: string = '';
    password: string = '';
    firstName: string = '';
    lastName: string = '';
    phoneNumber: string = '';
    confirmPassword?: string = '';
    
    constructor(init?: IUserFormValues)
    {
        Object.assign(this, init);
    }
}