import crypto from "crypto";
import { Tasks } from "./tasks";

export class User {
  private _id: string;
  get id() {
    return this._id;
  }

    private _name: string;
  get name() {
    return this._name;
  }
  set name(name: string){
    this._name = name
 }

  private _email: string;
  get email() {
    return this._email;
  }
  set email(email: string){
    this._email = email
 }

  private _password: string;
  get password() {
    return this._password;
  }
  set password (password: string){
    this._password = password
 }


  private _taskUser: Tasks[];
  
  get taskUser(): Tasks[] {
    return this._taskUser;
  }
 

  constructor( name: string, email: string, password: string) {
    this._id = crypto.randomUUID();
    this._name = name;
    this._email = email;
    this._password = password;
    this._taskUser = [];
  }

  toJSON() {
    return {
      id: this._id,
      name:this._name,
      email: this._email,

    };
  }
  
  toReturn() {
    return {
      id: this._id,
      name:this._name,
      email: this._email,
      taskUser: this._taskUser
    };
  }

   


  creatTask(newTaskUser: Tasks) {
    this._taskUser.push(newTaskUser);
  }



  }
  


