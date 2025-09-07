import { fakerES_MX as fa } from "@faker-js/faker";

const generatePet = () => {
  try {

    return {
      name: fa.animal.petName(),
      specie: fa.animal.type(),
      birthDate: fa.date.past({ years: 10 }),
    };
  } catch (error) {
    console.log(error);
  }
};

const generateUser = async () => {
  try {
    const gender = fa.helpers.arrayElement(["male", "female"]);
    const first_name = fa.person.firstName(gender);
    const last_name = fa.person.lastName();
    const email = `${last_name.toLocaleLowerCase()}${first_name[0].toLocaleLowerCase()}@email.com`;
    // const password = createHash("coder123");
    const password = "coder123";
    const role = fa.helpers.arrayElement(["user", "admin"]);
    const pets = [];
    return {
      first_name,
      last_name,
      email,
      password,
      role,
      pets
    };
  } catch (error) {
    console.log(error);
  }
};

export {
  generatePet,
  generateUser,
};
