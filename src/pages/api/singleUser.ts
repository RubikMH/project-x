import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import user from "../../../Modal/user";

type Data = {
  user: any;
};
// const getUsers = async () => {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //   res.status(200).json()
  try {
    const client = await clientPromise;
    const db = client.db("users");
    // console.log("req", req.body);

    const dev = await db
      .collection("dev")
      .find({ name: req.body })
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();

    res.json({ user: dev[0] });
  } catch (e) {
    console.error(e);
  }
}
