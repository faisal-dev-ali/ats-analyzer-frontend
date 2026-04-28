import { apiClient } from "./api-client";

import { ApiResponse } from "@/types/api";

import {
  ResumeAnalysisResponse,
  ResumeStatusResponse,
  UploadResponse,
} from "@/types/resume";

/* =========================================================
   UPLOAD RESUME
========================================================= */

export const uploadResume = async (
  file: File,
): Promise<ApiResponse<UploadResponse>> => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await apiClient.post<ApiResponse<UploadResponse>>(
    "/resumes/upload",
    formData,
  );

  return response.data;
};

/* =========================================================
   RESUME STATUS
========================================================= */

export const getResumeStatus = async (
  resumeId: number,
): Promise<ApiResponse<ResumeStatusResponse>> => {
  const response = await apiClient.get<ApiResponse<ResumeStatusResponse>>(
    `/resumes/${resumeId}/status`,
  );

  return response.data;
};

/* =========================================================
   GET ANALYSIS
========================================================= */

export const getResumeAnalysis = async (
  resumeId: number,
): Promise<ApiResponse<ResumeAnalysisResponse>> => {
  const response = await apiClient.get<ApiResponse<ResumeAnalysisResponse>>(
    `/resumes/${resumeId}/analysis`,
  );

  return response.data;
};
