import type { NextApiRequest, NextApiResponse } from "next";

type DataResponse = {
  success: boolean;
  message: string;
};

type TweetRequest = {
  userId: string;
  content: string;
  type: "tweet" | "model" | "camera";
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataResponse>
) {
  if (req.method === "POST") {
    const { userId, content, type }: TweetRequest = req.body;

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

    return res.status(200).json({
      success: true,
      message: "Data processed successfully",
    });
  }

  return res.status(405).json({
    success: false,
    message: "Method not allowed",
  });
}
