// 개발 환경인지 확인 (이 방식은 완벽하지 않지만 테스트용으로 사용 가능)
const isDev = self.location.hostname === "localhost";

// 개발 모드에서 디버그 로그 출력
function devLog(...args) {
  if (isDev) {
    console.log("[Service Worker]", ...args);
  }
}

self.addEventListener("install", function () {
  devLog("Service Worker installed");
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  devLog("Service Worker activated");
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", function (event) {
  // devLog('Fetch:', event.request.url);

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        devLog("Offline fallback triggered");
        return caches.match("/offline");
      })
    );
  }
});

// 푸시 알림 처리
self.addEventListener("push", function (event) {
  devLog("Push event received");

  if (event.data) {
    const data = event.data.json();
    devLog("Push data:", data);

    const options = {
      body: data.body,
      icon: data.icon || "/icons/icon-192x192.png",
      badge: "/icons/badge.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: "1",
      },
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});
