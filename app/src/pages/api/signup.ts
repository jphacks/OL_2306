import mysql_connection from '@/application/lib/db/connect_db';
import type { NextApiRequest, NextApiResponse } from 'next';

// 新規登録処理を行うAPI
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({
      message: 'POSTメソッドでアクセスしてください。',
    });
    return;
  }

  try {
    // クエリーパラメータから取得
    const email = req.body.email as string;
    const password = req.body.password as string;
    const user_name = req.body.user_name as string;
    let description = req.body.description as string;
    let icon_path = req.body.icon_path as string;

    // パラメータが空でないかチェック
    const check_parameter = (parameter_name: string, parameter: string) => {
      if (!parameter) {
        res.status(400).json({
          message: parameter_name + 'が空です。',
        });
        return false;
      }
      return true;
    };
    if (!check_parameter('email', email) || !check_parameter('password', password) || !check_parameter('user_name', user_name)) {
      return;
    }

    // description と icon_path は NULL の場合空文字に変換
    if (!description) {
      description = '';
    }
    if (!icon_path) {
      icon_path = '';
    }

    // mysqlと接続
    const connection = await mysql_connection();
    // SQL実行
    const result = await connection.query(
      'INSERT INTO users (email, password, user_name, description, icon_path) VALUES (?, ?, ?, ?, ?)',
      [email, password, user_name, description, icon_path]
    );
    connection.end();
    // // レスポンスを返す
    res.status(200).json({ message: '新規登録に成功しました。', contents: result[0] });
  } catch (error) {
    res.status(405).json({
      message: '新規登録に失敗しました。',
      error: error,
    });
  }
}