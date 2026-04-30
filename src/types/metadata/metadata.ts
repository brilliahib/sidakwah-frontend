export interface Metadata {
  status: string;
  statusCode: number;
  message: string;
}

type ValidationErrorData = Record<string, string[]>;

export interface ErrorResponse {
  meta: {
    status: string;
    statusCode: number;
    message: string;
  };
  data: ValidationErrorData | null;
}
