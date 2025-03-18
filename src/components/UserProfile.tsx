"use client";
import Image from "next/image";
import { useSendbirdStateContext } from "@sendbird/uikit-react";

const DEFAULT_USER_PROFILE_URL = "https://placehold.co/100x100"; // Fallback image URL
const DEFAULT_USER_NAME = "No Name";

export default function UserProfile() {
  const context = useSendbirdStateContext();
  const { userStore } = context.stores;
  const { user } = userStore;

  return (
    <section>
      <Image
        className="rounded-full"
        height={80}
        width={80}
        src={DEFAULT_USER_PROFILE_URL}
        alt={user.nickname ? `${user.nickname}'s avatar` : "Default avatar"}
      />

      <p>
        {user?.nickname || DEFAULT_USER_NAME}
        <br />
        {user?.isActive && <span>온라인</span>}
      </p>
    </section>
  );
}
