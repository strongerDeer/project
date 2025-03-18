"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SendbirdUI = dynamic(
  () => import("./SendbirdUI").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-screen w-full">
        채팅 로딩 중...
      </div>
    ),
  }
);

export default function Chat({ id }: { id: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 환경 변수 체크
    const appId = process.env.NEXT_PUBLIC_APP_ID;
    if (appId) {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        환경 변수를 확인 중입니다...
      </div>
    );
  }

  return <SendbirdUI id={id} />;
}
