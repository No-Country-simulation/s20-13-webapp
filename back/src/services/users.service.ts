import { User } from "../models/Users.model";

class UserService {
    async getUserById(id: string) {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("No existe un usuario con ese id");
        }
        return user;
    }

    async getAllUsers(filters: any) {
        const users = await User.find(filters);
        console.log(users);
        if (users.length === 0) {
            throw new Error("No se encontró ningún usuario");
        }
        return users;
    }

    async updateUser(id: string, data: any) {
        const user = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!user) {
            throw new Error("No se encontró ningún usuario");
        }
        return user;
    }

    async deleteUser(id: string) {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new Error("No existe un usuario con ese id");
        }
        return user;
    }
}

export default new UserService();