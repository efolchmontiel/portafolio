import type { PublicEnv } from "@/models/env.model";
import { PUBLIC_CONTACT } from "@/config/site";
import { getErrorMessage } from "@/lib/errors";
import { parseEmail, parseHttpUrl } from "@/lib/validation";

function loadPublicEnv(): PublicEnv {
  try {
    const githubUrl = parseHttpUrl(
      process.env.NEXT_PUBLIC_GITHUB_URL ?? PUBLIC_CONTACT.githubUrl,
      "NEXT_PUBLIC_GITHUB_URL",
    );
    const linkedinUrl = parseHttpUrl(
      process.env.NEXT_PUBLIC_LINKEDIN_URL ?? PUBLIC_CONTACT.linkedinUrl,
      "NEXT_PUBLIC_LINKEDIN_URL",
    );
    const email = parseEmail(
      process.env.NEXT_PUBLIC_EMAIL ?? PUBLIC_CONTACT.email,
      "NEXT_PUBLIC_EMAIL",
    );

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
