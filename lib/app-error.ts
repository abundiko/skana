type AppErrorDetails = Partial<{
  path: string;
  method: string;
  description: string;
  statusCode: number;
  uniqueCode: string;
}>;

export class AppError {
  message: string;
  details: AppErrorDetails = {};
  constructor(message: string, details: AppErrorDetails = {}) {
    this.message = message;
    this.details = details;
  }
}
