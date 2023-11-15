import { UserMongo } from "../dao/UserMongo.js";

class UsersService {
    constructor(dao){
        this.dao = new dao();
    }

    async login(email, password){
        return await this.dao.login(email, password);
    }

    async register(first_name, last_name, email, age, password){
        return await this.dao.register(first_name, last_name, email, age, password);
    }

    async findUserById(id){
        return await this.dao.findUserById(id);
    }

}

export const usersService = new UsersService(UserMongo);