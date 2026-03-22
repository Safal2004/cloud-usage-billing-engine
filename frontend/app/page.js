// import ApiKeyInput from "./components/ApiKeyInput";
// import UploadForm from "./components/UploadForm";
// import InvoiceSection from "./components/InvoiceSection";
// import ObjectList from "./components/ObjectList";
// export default function Home() {
//   return (
//     <main>
//       <h1>Object Storage Billing Dashboard</h1>
//       <ApiKeyInput />
//       <UploadForm />
//       <InvoiceSection />
//       <ObjectList />
//     </main>
//   );
// }


"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);

  return null;
}
