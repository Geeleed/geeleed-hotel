import { ep_stayIn } from "@/config/api_endpoint";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function useAdmin(
  page: React.JSX.Element
): React.JSX.Element | null {
  const [Page, setPage] = useState<null | React.JSX.Element>(null);
  const router = useRouter();
  const checkAuth = async () => {
    await fetch(ep_stayIn, {
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data.role.includes("admin")) {
          localStorage.setItem("token", res.token);
          setPage(page);
        } else {
          alert("ต้องใช้สิทธิ์ผู้ดูแลเพื่อเข้าถึงข้อมูล");
        }
      })
      .catch(() => router.push("/lobby"));
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return Page;
}
