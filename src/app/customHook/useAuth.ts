import { ep_stayIn } from "@/config/api_endpoint";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAuth({
  page,
  currentUrl,
}: {
  page: React.JSX.Element;
  currentUrl: string;
}): React.JSX.Element | null {
  const [Page, setPage] = useState<null | React.JSX.Element>(null);
  const router = useRouter();
  // กำหนด path ที่ยังไม่ signin
  const out = ["/", "/signin", "/signup", "/forgot"];
  const checkAuth = async () => {
    await fetch(ep_stayIn, {
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.process === false && out.includes(currentUrl)) {
          setPage(page);
        } else if (res.process === true && out.includes(currentUrl)) {
          localStorage.setItem("token", res.token);
          router.push("/lobby");
        } else if (res.process) {
          localStorage.setItem("token", res.token);
          setPage(page);
        } else {
          router.push("/");
        }
      })
      .catch(() => router.push("/"));
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return Page;
}
