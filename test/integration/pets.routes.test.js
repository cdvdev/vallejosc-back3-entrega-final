import { describe, it } from "mocha";
import supertest from "supertest";
import { expect } from "chai";
import mongoose, { isValidObjectId } from "mongoose";
import fs from "fs"

const requester = supertest("http://localhost:8080")

describe("Pruebas router pets", function () {
    this.timeout(10_000); //2000

    before(async () => {
        await mongoose.connect(`mongodb+srv://user1:pass11@cluster0.etjvq.mongodb.net/74590?retryWrites=true&w=majority&appName=Cluster0`)
    })

    after(async () => {
        await mongoose.connection.collection("pets").deleteMany({ specie: "test" });
    })

    let petId;

    describe("Integration tests for the endpoints /api/pets", () => {

        it("GET /api/pets/ get all pets", async () => {
            let { status, body } = await requester.get("/api/pets");

            expect(status).to.be.eq(200);
            expect(body.payload).to.be.an("array");
        })

        it("POST /api/pets/ create a pet", async () => {
            const { status, body } = await requester.post("/api/pets")
                .send({
                    name: "Rocky",
                    specie: "test",
                    birthDate: "2025-12-08",
                });

            expect(status).to.be.eq(200);
            expect(isValidObjectId(body.payload._id)).to.be.true;

            petId = body.payload._id;

            console.log(petId)
        })

        it("PUT /api/pets/:id update a pet", async () => {
            let { status, body } = await requester.put(`/api/pets/${petId}`)
                .send({ name: "pipo" });

            console.log(body)

            expect(status).to.be.eq(200);
        })

        it("POST /api/pets/withimage save a pet with a image", async () => {
            let petMock = {
                name: "Rocky",
                specie: "test",
                birthDate: new Date(2025, 11, 8).toUTCString()
            };

            let { status, body } = await requester.post("/api/pets/withimage")   //.send(petMock);
                .field("name", petMock.name)
                .field("specie", petMock.specie)
                .field("birthDate", petMock.birthDate)
                .attach("image", "./img-roger.jpg")

            // console.log(body);                                    

            expect(status).to.be.eq(200);
            expect(body.payload.image).to.be.ok;
            expect(fs.existsSync(body.payload.image)).to.be.eq(true)
            fs.unlinkSync(body.payload.image);
        })
    })

});