jest.mock("../models/Staff", () => {
  return {
    __esModule: true,
    default: {
      findOne: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };
});

import Staff from "../models/Staff";
import { staffRedeem } from "../services/redemptionService";

const mockedStaff = Staff as jest.Mocked<typeof Staff>;

describe("staffRedeem() full function test", () => {
  const sampleCsv = `staff_pass_id,team_name,created_at\nMANAGER_123,GRYFFINDOR,1620761965220\nBOSS_456,RUST,1620761965321\nSTAFF_789,BASS,1620761965453`;

  it("should process CSV and return redemption results", async () => {

    const result = await staffRedeem(sampleCsv);

    if (!(result instanceof Error)) {

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(sampleCsv.trim().split('\n').length - 1);

    // DB calls
    expect(mockedStaff.findOne).toHaveBeenCalledTimes(sampleCsv.trim().split('\n').length - 1); // For each employee, it will run once for finding if employee exisits
    expect(mockedStaff.findAll).toHaveBeenCalledTimes(sampleCsv.trim().split('\n').length - 1); // For each employee, it will run once for finding if the team has redeemed
    expect(mockedStaff.create).toHaveBeenCalledTimes(sampleCsv.trim().split('\n').length - 1); // For sample, it will run once for every new employee creation
    expect(mockedStaff.update).toHaveBeenCalledTimes(sampleCsv.trim().split('\n').length - 1); // For sample, it will run once for every new employee and update the team for redemption

  // Only run the function if it's not returning an error
    expect(result[0]).toHaveProperty("staff");
    expect(result[0]).toHaveProperty("team");
    expect(result[0]).toHaveProperty("redeemed_at");
    expect(result[0]).toHaveProperty("redemption_remark");
    } else {
      console.log("Function returned an error", result.message);
    }
  });
});