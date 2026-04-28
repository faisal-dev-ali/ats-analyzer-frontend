"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadResume } from "@/services/resume-service";

export const useUploadResume = () => {
  return useMutation({
    mutationFn: uploadResume,
  });
};
