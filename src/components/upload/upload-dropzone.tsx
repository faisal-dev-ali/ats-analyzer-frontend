"use client";

import { useCallback } from "react";

import { useRouter } from "next/navigation";

import { useDropzone } from "react-dropzone";

import { UploadCloud } from "lucide-react";

import { toast } from "sonner";

import { useUploadResume } from "@/hooks/use-upload-resume";

export function UploadDropzone() {
  const router = useRouter();

  const { mutate, isPending } = useUploadResume();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (!file) return;

      mutate(file, {
        onSuccess: (response) => {
          toast.success("Resume uploaded successfully");

          const resumeId = response.data.resumeId;

          router.push(`/results/${resumeId}`);
        },

        onError: () => {
          toast.error("Failed to upload resume");
        },
      });
    },
    [mutate, router],
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="rounded-[32px] border border-dashed border-gray-300 bg-white p-20 text-center shadow-sm transition hover:border-rose-400 hover:shadow-md dark:border-white/10 dark:bg-slate-900"
    >
      <input {...getInputProps()} />

      <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-500/10">
        <UploadCloud className="h-12 w-12 text-rose-500" />
      </div>

      <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-[var(--foreground)]">
        Upload Resume
      </h2>

      <p className="mb-6 text-lg text-gray-500 dark:text-[var(--muted)]">
        Drag & drop your PDF resume here
      </p>

      <div className="inline-flex rounded-2xl bg-gray-100 px-5 py-3 text-sm text-gray-600 dark:bg-white/5 dark:text-gray-300">
        Supports PDF files only
      </div>

      {isPending && (
        <div className="mt-8">
          <div className="mb-3 text-sm font-medium text-rose-500">
            Analyzing resume...
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
            <div className="h-full w-2/3 animate-pulse rounded-full bg-rose-500" />
          </div>
        </div>
      )}
    </div>
  );
}
