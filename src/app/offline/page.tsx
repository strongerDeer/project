import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">오프라인 상태입니다</h1>
      <p className="mb-6">
        인터넷 연결이 복구되면
        <Link href="/" className="text-blue-500 hover:underline">
          홈페이지
        </Link>
        로 돌아갈 수 있습니다.
      </p>
    </div>
  );
}
