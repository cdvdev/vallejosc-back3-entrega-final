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
      .deleteMany({ firt_name: "test" });
  });

  let userId;

  describe("Integrations test for the endpoints /api/users", async () => {
    it("GET api/users get all user", async () => {
      let { status, body } = await requester.get("/api/users");
        
      expect(status).to.be.eq(200);
      expect(body.payload).to.be.an("array");
    });

  });
});
