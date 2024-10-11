import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  console.log(req.method);
  return res.status(200).send({ message: "ok" });
}
