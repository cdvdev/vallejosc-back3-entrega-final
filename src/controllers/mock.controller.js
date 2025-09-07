// mock.controller.js

import PetDTO from "../dto/Pet.dto.js";
import UserDTO from "../dto/User.dto.js";
import { generatePet, generateUser } from "../mocks/mocks.js";
import { petsService, usersService } from "../services/index.js";

const createMocksPets = async (req, res) => {
  try {
    const { count = 10 } = req.query;
    const pets = Array(Number(count))
      .fill(0)
      .map(() => generatePet());
    console.log(pets);
    res.send({ status: "success create pets", payload: pets });
  } catch (error) {
    console.log(error);
  }
};

const createMocksUsers = async (req, res) => {
  try {
    const { count = 10 } = req.query;
    const users = await Promise.all(
      Array(Number(count))
        .fill(0)
        .map(() => generateUser())
    );
    console.log(users);
    res.send({ status: "success", payload: users });
  } catch (error) {
    console.log(error);
  }
};

const generateData = async (req, res) => {
  try {
    const users = req.query.users;
    const pets = req.query.pets;

    console.log(users, pets);
    const petsMocks = Array(Number(pets))
      .fill(0)
      .map(() => generatePet());
    const savePets = [];
    for (const petData of petsMocks) {
      const pet = PetDTO.getPetInputFrom(petData);
      const result = await petsService.create(pet);
      savePets.push(result);
    }
    const usersMocks = await Promise.all(
      Array(Number(users))
        .fill(0)
        .map(() => generateUser())
    );
    const saveUsers = [];
    for (const userData of usersMocks) {
      const user = UserDTO.getUserTokenFrom(userData);
      const result = await usersService.create(user);
      saveUsers.push(result);
    }
    res.send({
      status: "success create pets",
      payload: { savePets, saveUsers },
    });
  } catch (error) {
    console.log(error);
  }
};

export default {
  createMocksPets,
  createMocksUsers,
  generateData,
};
