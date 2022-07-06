export enum ROLE {ADMIN="ROLE_ADMIN", REFERENT="ROLE_REFERENT", STUDENT="ROLE_STUDENT", TEACHER="ROLE_TEACHER"}

export class User{

  id?: number
  firstName: string
  lastName: string
  username: string
  password: string
  phone: string
  email: string
  roles: string[]
  dateOfRegistration: Date
  select: boolean
  accessible: boolean

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phone = user.phone;
    this.email = user.email;
    this.roles = user.roles;
    this.dateOfRegistration = user.dateOfRegistration;
    this.accessible = user.accessible;
    this.select = user.select;
  }

}

export class PasswordUpdate{

  currentPassword: string
  newPassword: string

  constructor(password: PasswordUpdate) {
    this.currentPassword = password.currentPassword;
    this.newPassword = password.newPassword;
  }

}

export class UserList{

  id?: number
  firstName: string
  lastName: string
  roles: string[]
  select: boolean
  phone: string
  email: string
  dateOfRegistration: Date

  constructor(user: UserList) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.roles = user.roles;
    this.select = user.select;
    this.phone = user.phone;
    this.email = user.email;
    this.dateOfRegistration = user.dateOfRegistration;
  }

}

export class Student extends User{
  earnedCredits: number
}

export class Teacher extends User{
}

export class Referent extends User{
}

export class Administrator extends User{
}
