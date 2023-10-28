import { Flex, Heading, Link, Text } from "@chakra-ui/react";
import { FC } from "react";
import { headerIconText, headerStyle } from "./HeaderPre.css";

interface HeaderPreProps {
    title: string
}

export const HeaderPre:FC<HeaderPreProps> = ({ title }) => {
    return <>
    <Flex as='header' css={headerStyle}>
        <Heading css={headerIconText}>
          <Text as='a' href="/">{title}</Text>
        </Heading>
          <Flex flex={2} justify='end' gap={4}>
            {/* レストラン側の場合のみ表示 */}
            <>
              <Link href='/' color="white">QRコード</Link>
              <Link href='/' color="white">店舗情報</Link>
              {/* 後でボタンにする↓ */}
              <Link href='/signin' color="white">ログアウト</Link>
            </>
          </Flex>
      </Flex>
    </>
}