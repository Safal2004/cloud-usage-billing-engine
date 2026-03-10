// "use client";
// import { useState } from "react";
// import { apiRequest } from "../utils/api";

// export default function UploadForm() {
//   const [objectKey, setObjectKey] = useState("");
//   const [size, setSize] = useState("");

//   const upload = async () => {
//     await apiRequest("/usage/storage/upload", "POST", {
//       bucket_id: 1,
//       object_key: objectKey,
//       object_size_mb: Number(size),
//     });
//     alert("Object uploaded");
//   };

//   return (
//     <div>
//       <h3>Upload Object</h3>
//       <input
//         placeholder="File name (object key)"
//         value={objectKey}
//         onChange={(e) => setObjectKey(e.target.value)}
//       />
//       <input
//         placeholder="Size (MB)"
//         value={size}
//         onChange={(e) => setSize(e.target.value)}
//       />
//       <button onClick={upload}>Upload</button>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { apiRequest } from "../utils/api";

export default function UploadForm() {
  const [file, setFile] = useState(null);

  const upload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const objectKey = file.name;
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);

    await apiRequest("/usage/storage/upload", "POST", {
      bucket_id: 1,
      object_key: objectKey,
      object_size_mb: Number(sizeMB)
    });

    alert("Object uploaded successfully");
  };

  return (
    <div>
      <h3>Upload Object</h3>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={upload}>Upload</button>
    </div>
  );
}
