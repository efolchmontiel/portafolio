export class AppError extends Error {
  readonly code: string;
  readonly cause?: unknown;

  constructor(message: string, code = "APP_ERROR", cause?: unknown) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.cause = cause;
  }
}

export function getErrorMessage(
  error: unknown,
  context = "Operación no completada",
): string {
  if (error instanceof AppError) {
    return `${context}: ${error.message} (code: ${error.code})`;
  }
  if (error instanceof Error) {
    return `${context}: ${error.message}`;
  }
  if (typeof error === "string") {
    return `${context}: ${error}`;
  }
  try {
    return `${context}: ${JSON.stringify(error)}`;
  } catch (serializationError) {
    const fallback =
      serializationError instanceof Error
        ? serializationError.message
        : "error al serializar";
    return `${context}: valor desconocido (${fallback})`;
  }
}
