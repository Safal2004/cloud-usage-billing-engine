import ApiKeyInput from "./components/ApiKeyInput";
import UploadForm from "./components/UploadForm";
import InvoiceSection from "./components/InvoiceSection";
import ObjectList from "./components/ObjectList";
export default function Home() {
  return (
    <main>
      <h1>Object Storage Billing Dashboard</h1>
      <ApiKeyInput />
      <UploadForm />
      <InvoiceSection />
      <ObjectList />
    </main>
  );
}
