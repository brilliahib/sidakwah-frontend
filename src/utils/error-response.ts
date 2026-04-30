import { ErrorResponse } from "@/types/metadata/metadata";

export const getErrorMessage = (error: unknown) => {
  const err = error as {
    response?: {
      data?: ErrorResponse;
    };
  };

  const apiError = err.response?.data;

  if (!apiError) return "Terjadi kesalahan.";

  if (apiError.data) {
    const messages: string[] = [];

    Object.entries(apiError.data).forEach(([field, errs], fieldIndex) => {
      messages.push(`${fieldIndex + 1}. ${field}`);

      (Array.isArray(errs) ? errs : [errs]).forEach((message, errorIndex) => {
        messages.push(`   ${errorIndex + 1}) ${message}`);
      });
    });

    return messages.join("\n");
  }

  return apiError.meta.message ?? "Terjadi kesalahan.";
};
