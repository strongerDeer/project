"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // 개발 모드에서도 서비스 워커 등록을 진행
      window.addEventListener("load", function () {
        navigator.serviceWorker
          .register("/sw.js", {
            scope: "/",
            // 개발 모드에서는 항상 서비스 워커를 업데이트하도록 설정
            updateViaCache: "none",
          })
          .then(function (registration) {
            console.log(
              "ServiceWorker registration successful with scope: ",
              registration.scope
            );

            // 개발 모드에서 서비스 워커 즉시 업데이트 적용
            registration.update();
          })
          .catch(function (error) {
            console.log("ServiceWorker registration failed: ", error);
          });
      });
    }
  }, []);

  return null;
}
