import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Signout() {
  const router = useRouter();
  return (
    <Link
      href={"/"}
      onClick={async () => {
        localStorage.removeItem("token");
        router.push("/");
      }}
    >
      ออกจากระบบ
    </Link>
  );
}
