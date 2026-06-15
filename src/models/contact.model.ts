export type ContactLinkId = "github" | "linkedin" | "email";

export interface ContactLink {
  readonly id: ContactLinkId;
  readonly label: string;
  readonly href: string;
  readonly display?: string;
}
