import mysql_connection from "@/application/lib/db/connect_db";
import type { NextApiRequest, NextApiResponse } from "next";

type TweetImage = {
  tweetId: number;
  imagePath: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // mysqlと接続
  const connection = await mysql_connection();

  if (req.method === "POST") {
    const { tweetId, imagePath }: TweetImage = req.body;

    if (!tweetId || !imagePath) {
      return res.status(400).json({
        success: false,
        message: "Required parameters are missing",
      });
    }

    try {
      const result = await connection.query(
        "INSERT INTO tweet_images (tweet_id, image_path) VALUES (?, ?)",
        [tweetId, imagePath]
      );

      res
        .status(200)
        .json({ message: "Data has been successfully stored.", result });
    } catch (error) {
      res.status(500).json({
        message: "Adding data failed.",
        error: error,
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: "Method not allowed",
  });
}
