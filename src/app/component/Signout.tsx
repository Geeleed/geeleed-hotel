import Link from "next/link";
import React from "react";
import { deleteToken } from "../signin/actions";

export default function Signout() {
  return (
    <Link
      href={"/"}
      onClick={async () => {
        await deleteToken();
        localStorage.removeItem("token");
      }}
    >
      ออกจากระบบ
    </Link>
  );
}
