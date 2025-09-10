import { describe, it } from "mocha";
import supertest from "supertest";
import { expect } from "chai";
import mongoose, { isValidObjectId } from "mongoose";
import fs from "fs";

const requester = supertest("http://localhost:8080");

describe("Pruebas router pets", function () {
  this.timeout(10_000); //2000

  before(async () => {
    await mongoose.connect(
      `mongodb+srv://user1:pass11@cluster0.etjvq.mongodb.net/74590?retryWrites=true&w=majority&appName=Cluster0`
    );
  });

  after(async () => {
    await mongoose.connection
      .collection("users")
      .deleteMany({ first_name: "userMock" });
  });

  let userId;

  describe("Integrations test for the endpoints /api/sessions", async () => {
    it("POST api/sessions/register a new user", async () => {
      let userMock = {
        first_name: "userMock",
        last_name: "userMock",
        email: "userMock@userMock.com",
        password: "userMock",
      };

      let { status, body } = await requester
        .post("/api/sessions/register")
        .send(userMock);
      console.log(body)
      expect(status).to.be.eq(200);
      expect(isValidObjectId(body.payload)).to.be.true;
    });
  });
});
