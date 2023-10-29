import mysql_connection from "@/application/lib/db/connect_db";
import type { NextApiRequest, NextApiResponse } from "next";

type Tweet = {
  userId: string;
  content: string;
  type: "tweet" | "model" | "camera";
  imagePath?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // mysqlと接続
  const connection = await mysql_connection();

  if (req.method === "POST") {
    const { userId, content, type, imagePath }: Tweet = req.body;

    if (!userId || !content || !type) {
      return res.status(400).json({
        success: false,
        message: "Required parameters are missing",
      });
    }

    if (!["tweet", "model", "camera"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid type parameter",
      });
    }

    try {
      const result = await connection.query(
        "INSERT INTO tweet (user_id, content, type, image_path) VALUES (?, ?, ?, ?)",
        [userId, content, type, imagePath]
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
