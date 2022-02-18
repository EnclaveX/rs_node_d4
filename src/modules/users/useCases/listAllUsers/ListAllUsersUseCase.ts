import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    if (!user_id) {
      throw new Error("User not found!");
    }

    const userAdmin = this.usersRepository.findById(user_id);

    if (!userAdmin && user_id) {
      throw new Error("User not found!");
    }

    if (userAdmin && !userAdmin.admin) {
      throw new Error("User not admin!");
    }

    const user = this.usersRepository.list();
    return user;
  }
}

export { ListAllUsersUseCase };
