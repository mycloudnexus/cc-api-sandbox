import { spawn, ChildProcess } from "child_process";
import axios, { AxiosInstance } from "axios";
import waitOn from "wait-on";

describe("the sandbox api server", () => {
  let start: ChildProcess;
  let client: AxiosInstance;

  beforeAll(() => {
    client = axios.create({
      baseURL: "http://localhost:9000",
      validateStatus: () => true,
      headers: { "Content-Type": "application/json" },
    });
    start = spawn("yarn", ["start"], {
      cwd: __dirname,
      detached: true,
      stdio: "inherit",
    });
  });

  afterAll(() => {
    if (start.pid) {
      process.kill(-start.pid);
    }
  });

  beforeEach(async () => {
    // Need to wait for the port to free up, otherwise every other test fails wtih "socket hang up".
    // In theory, should just have to do a waitOn in the beforeAll statement, but something's holding on to the socket?
    // TODO: Find out why.
    await waitOn({ resources: ["tcp:localhost:9000"] });
  });

  it("should return the heartbeat with the right fields", async () => {
    const result = await client.get("/heartbeat");
    expect(result.status).toBe(200);
    const data = result.data;
    expect(typeof data).toBe("object");
    if (typeof data != "object") return;

    expect(data).toHaveProperty("name");
    expect(data).toHaveProperty("now");
    expect(data).toHaveProperty("uptime");
    expect(data).toHaveProperty("humanUptime");
    expect(data).toHaveProperty("uptimeSeconds");
    expect(data).toHaveProperty("version");
  });
});
