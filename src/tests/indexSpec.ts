import supertest from "supertest";
import app from "../index";

describe("Testing API endpoint", () => {
  const request = supertest(app);

  it(`api endpoint "/" is working`, async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });

  it('api endpoint "/api" is working', async () => {
    const response = await request.get("/api");
    expect(response.status).toBe(200);
  });

  it('api endpoint "/api?fileName=smile.png&width=250&height=250" is working', async () => {
    const response = await request.get(
      "/api?fileName=smile.png&width=250&height=250"
    );
    const bodyText = response.text;
    const img = bodyText.includes("data:image/jpeg;base64");
    expect(response.status).toBe(200);
    expect(img == true);
  });

  it('api endpoint "/api?fileName=smile.png&width=250" is working', async () => {
    const response = await request.get(
      "/api?fileName=smile.png&width=250&height=250"
    );
    const bodyText = response.text;
    const img = bodyText.includes("not a valid height");
    expect(response.status).toBe(200);
    expect(img == true);
  });
});
