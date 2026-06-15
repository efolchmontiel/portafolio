import { AppError } from "@/lib/errors";

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function parseHttpUrl(
  value: string | undefined,
  fieldName: string,
): string | undefined {
  if (value === undefined || value.trim() === "") {
    return undefined;
  }

  try {
    const url = new URL(value.trim());
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new AppError(
        `${fieldName} debe usar protocolo http o https`,
        "INVALID_URL_PROTOCOL",
      );
    }
    return url.toString();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      `${fieldName} no es una URL válida: ${value}`,
      "INVALID_URL",
      error,
    );
  }
}

export function parseEmail(
  value: string | undefined,
  fieldName: string,
): string | undefined {
  if (value === undefined || value.trim() === "") {
    return undefined;
  }

  const trimmed = value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmed)) {
    throw new AppError(
      `${fieldName} no tiene formato de email válido`,
      "INVALID_EMAIL",
    );
  }
  return trimmed;
}
