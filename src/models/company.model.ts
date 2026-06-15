import type { StaticImageData } from "next/image";

export interface Company {
  readonly id: string;
  readonly name: string;
  readonly role?: string;
  readonly logo: StaticImageData;
}
