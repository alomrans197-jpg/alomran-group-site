 Implement Uploadcare File Uploader You are implementing file uploads in a React app using **Uploadcare’s latest File Uploader** via the **official React wrapper**. Follow these requirements exactly. ## ✅ Libraries & Versions (guardrails) * **Install (and use) only:** `@uploadcare/react-uploader` **version ≥ 1.10.1**. * Rationale: that package exposes `FileUploaderMinimal`, `FileUploaderRegular`, and `FileUploaderInline`, plus a required stylesheet. ([GitHub][1], [jsDelivr][2]) * **Also relies on:** `@uploadcare/file-uploader` types/options under the hood (provided transitively by the React wrapper). ([jsDelivr][3]) * **Do NOT use (legacy / forbidden):** * `uploadcare-widget` (jQuery widget) * `@uploadcare/react-widget` * Any CDN/script tag approach for older widgets These are legacy paths; use only the modern File Uploader React wrapper. ([npm][4], [GitHub][5]) ## ✅ Required UI & Behavior * **Mode:** `FileUploaderRegular` * **Color scheme:** `uc-light` * **Primary color:** `uc-purple` (applied as a class) * **Upload sources:** exactly `local, camera, gdrive, facebook` * **Display:** `filesViewMode="grid"` Notes: * `uc-light` and `uc-purple` are supported theme/brand utility classes on the new File Uploader. Apply them to the underlying uploader element via the React wrapper’s `classNameUploader` prop. ([GitHub][1], [Uploadcare][6]) * `filesViewMode="grid"` and `sourceList="local, camera, gdrive, facebook"` are standard File Uploader options (React uses **camelCase** prop names that map to the underlying config). ([Uploadcare][7]) ## ✅ Implementation details * Import the **core CSS** from `@uploadcare/react-uploader/core.css`. ([GitHub][1]) * Use `6057f88b1a59bb9573ed` Uploadcare **public key** in the `pubkey` prop. * If using Next.js/App Router, use the special import path `@uploadcare/react-uploader/next` and mark the component `'use client'`. (Regular React apps use the base import shown below.) ([GitHub][1]) ## ✅ React example (TypeScript or JS) ```tsx // Uploader.tsx // Purpose: Regular Uploadcare File Uploader with light scheme, purple primary, // specific sources, and grid files view — using the official React wrapper. import { FileUploaderRegular } from "@uploadcare/react-uploader"; import "@uploadcare/react-uploader/core.css"; export default function Uploader() { return ( <FileUploaderRegular pubkey="6057f88b1a59bb9573ed" classNameUploader="uc-light uc-purple" sourceList="local, camera, gdrive, facebook" userAgentIntegration="llm-nextjs" filesViewMode="grid" /> ); } ``` If you are in **Next.js**, import from `@uploadcare/react-uploader/next` and ensure this file runs on the client: ```tsx "use client"; import { FileUploaderRegular } from "@uploadcare/react-uploader/next"; import "@uploadcare/react-uploader/core.css"; // ...same component body as above ``` ## ✅ Installation commands ```bash npm install @uploadcare/react-uploader # or: yarn add @uploadcare/react-uploader ``` > Do **not** add `uploadcare-widget` or `@uploadcare/react-widget`. Those are legacy. Use only the modern React wrapper shown here. ([npm][4], [GitHub][5]) ## References to respect (for correctness) * Official React wrapper, components, CSS import, and Next.js import guidance. ([GitHub][1]) * Availability of `FileUploaderRegular`. ([npm][8]) * Theme & primary color classes (`uc-light`, `uc-purple`). ([Uploadcare][6]) * `filesViewMode="grid"` and grid behavior. ([Uploadcare][7]) * Supported source names (`local`, `camera`, `gdrive`, `facebook`). ([Uploadcare][9]) [1]: https://github.com/uploadcare/react-file-uploader "GitHub - uploadcare/react-file-uploader" [2]: https://cdn.jsdelivr.net/npm/%40uploadcare/react-uploader%401.8.1/dist/?utm_source=chatgpt.com "@uploadcare/react-uploader CDN by jsDelivr - A free, fast, and ..." [3]: https://cdn.jsdelivr.net/npm/%40uploadcare/react-uploader%401.8.1/dist/react-uploader.d.ts "cdn.jsdelivr.net" [4]: https://www.npmjs.com/package/%40uploadcare/react-widget?utm_source=chatgpt.com "uploadcare/react-widget" [5]: https://github.com/uploadcare/uploadcare-widget?utm_source=chatgpt.com "Uploadcare Widget, an ultimate tool for HTML5 file upload ..." [6]: https://uploadcare.com/uploader1/?utm_source=chatgpt.com "File Uploader v1 by Uploadcare" [7]: https://uploadcare.com/docs/file-uploader/styling/?utm_source=chatgpt.com "File Uploader styling | Uploadcare docs" [8]: https://www.npmjs.com/package/%40uploadcare/react-uploader/v/1.1.0?utm_source=chatgpt.com "uploadcare/react-uploader" [9]: https://uploadcare.com/docs/upload-sources/?utm_source=chatgpt.com "Upload sources for File Uploader | Uploadcare docs"
'use client';
import { useState } from 'react';
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';

export default function Uploader() {
  const [images, setImages] = useState<string[]>([]); // ← تخزين روابط الصور

  return (
    <>
      <FileUploaderRegular
        pubkey="6057f88b1a59bb9573ed"
        classNameUploader="uc-light uc-purple"
        sourceList="local, camera, gdrive, facebook"
        userAgentIntegration="llm-nextjs"
        filesViewMode="grid"
        onUploadComplete={(fileInfo) => {
         const url = fileInfo.cdnUrl + '/-/preview/600x400/';
          setImages((prev) => [...prev, url]); // ← حفظ الصورة الجديدة
        }}
      />

      {/* عرض الصور المرفوعة */}
      <div className="gallery" style={{ marginTop: '20px' }}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`صورة ${index + 1}`}
            style={{
              maxWidth: '300px',
              margin: '10px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          />
        ))}
      </div>
    </>
  );
}

