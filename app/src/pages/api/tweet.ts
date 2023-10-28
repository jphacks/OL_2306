import type { NextApiRequest, NextApiResponse } from "next";

type DataResponse = {
  success: boolean;
  message: string;
};

type Tweet = {
  userId: string;
  content: string;
  type: "tweet" | "model" | "camera";
};

// この配列は仮のデータ
const mockTweets: Tweet[] = [
  { userId: "1", content: "First tweet", type: "tweet" },
  { userId: "2", content: "Second tweet", type: "tweet" },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataResponse | Tweet[]>
) {
  if (req.method === "POST") {
    const { userId, content, type }: Tweet = req.body;

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
  } else if (req.method === "GET") {
    // 仮のデータ
    return res.status(200).json(mockTweets);
  }

  return res.status(405).json({
    success: false,
    message: "Method not allowed",
  });
}
