import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "20s", target: 50 },
    { duration: "20s", target: 100 },
    { duration: "20s", target: 200 },
    { duration: "20s", target: 0 },
  ],
};

export default function () {
  const url = "https://loan-backend-vert.vercel.app/api/applications";

  const payload = JSON.stringify({
    name: "Load Test User",
    phoneNumber: "9999999999",
    primaryContactNumber: "9999999999",
    address: "Test Address",
    dateOfBirth: "2000-01-01",
    gender: "male",
    loanCategory: "personal",

    referralName1: "Ref One",
    referralPhone1: "8888888888",
    referralName2: "Ref Two",
    referralPhone2: "7777777777"
  });

  const headers = { headers: { "Content-Type": "application/json" } };

  const res = http.post(url, payload, headers);

  check(res, {
    "status is 201": (r) => r.status === 201,
  });

  sleep(1);
}
