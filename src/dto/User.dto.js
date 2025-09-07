import { createHash } from "../utils/index.js";

export default class UserDTO {
  static getUserTokenFrom = (user) => {
    return {
      // name: `${user.first_name} ${user.last_name}`,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      email: user.email,
      password: createHash(user.password),
    };
  };
}
