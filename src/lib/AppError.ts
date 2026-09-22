export type AppErrorCode =
  | "OFFLINE"
  | "TIMEOUT"
  | "NETWORK_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION"
  | "RATE_LIMIT"
  | "SERVER_ERROR"
  | "UNKNOWN";

export class AppError extends Error {
  code: AppErrorCode;
  status?: number;
  data?: unknown;

  constructor(
    message: string,
    code: AppErrorCode,
    status?: number,
    data?: unknown,
  ) {
    super(message);

    this.name = "AppError";
    this.code = code;
    this.status = status;
    this.data = data;
  }
}
