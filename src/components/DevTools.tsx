"use client";

import { useState } from "react";

export default function DevTools() {
  const [message, setMessage] = useState("");

  // 서비스 워커 강제 업데이트
  const updateServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      let updated = false;

      for (const registration of registrations) {
        await registration.update();
        updated = true;
        setMessage("서비스 워커가 업데이트되었습니다.");
      }

      if (!updated) {
        setMessage("업데이트할 서비스 워커가 없습니다.");
      }
    } else {
      setMessage("서비스 워커가 지원되지 않습니다.");
    }
  };

  // 캐시 초기화
  const clearCache = async () => {
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
      setMessage("캐시가 초기화되었습니다.");
    } else {
      setMessage("캐시 API가 지원되지 않습니다.");
    }
  };

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-gray-800 text-white p-4 rounded shadow-lg z-50">
      <h3 className="text-lg font-bold mb-2">PWA 개발 도구</h3>
      <div className="space-y-2">
        <button
          onClick={updateServiceWorker}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
        >
          서비스 워커 업데이트
        </button>
        <button
          onClick={clearCache}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          캐시 초기화
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </div>
    </div>
  );
}
