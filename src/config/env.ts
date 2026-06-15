import type { PublicEnv } from "@/models/env.model";
import { getErrorMessage } from "@/lib/errors";
import { parseEmail, parseHttpUrl } from "@/lib/validation";

function loadPublicEnv(): PublicEnv {
  try {
    const githubUrl = parseHttpUrl(
      process.env.NEXT_PUBLIC_GITHUB_URL,
      "NEXT_PUBLIC_GITHUB_URL",
    );
    const linkedinUrl = parseHttpUrl(
      process.env.NEXT_PUBLIC_LINKEDIN_URL,
      "NEXT_PUBLIC_LINKEDIN_URL",
    );
    const email = parseEmail(process.env.NEXT_PUBLIC_EMAIL, "NEXT_PUBLIC_EMAIL");

    return { githubUrl, linkedinUrl, email };
  } catch (error) {
    const message = getErrorMessage(error, "Configuración de entorno inválida");
    if (process.env.NODE_ENV === "development") {
      console.error(message);
    }
    return {};
  }
}

export const publicEnv: PublicEnv = loadPublicEnv();
