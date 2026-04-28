import { UploadDropzone } from "@/components/upload/upload-dropzone";

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h1 className="mb-5 text-6xl font-black tracking-tight text-gray-900 dark:text-[var(--foreground)]">
            Upload Your Resume
          </h1>

          <p className="mx-auto max-w-2xl text-xl text-gray-500 dark:text-[var(--muted)]">
            AI-powered ATS analysis with recruiter-grade insights.
          </p>
        </div>

        <UploadDropzone />
      </div>
    </main>
  );
}
