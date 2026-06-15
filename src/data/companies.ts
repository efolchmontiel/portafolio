import type { Company } from "@/models/company.model";
import brechaLogo from "../../assets/imagenes/logo-brecha.png";
import iradLogo from "../../assets/imagenes/irad.png";
import isstecLogo from "../../assets/imagenes/isstec.png";
import octopullLogo from "../../assets/imagenes/octopull.jpg";

export const companies: readonly Company[] = [
  {
    id: "octopull",
    name: "Octopull",
    role: "Colaboración",
    logo: octopullLogo,
  },
  {
    id: "brecha",
    name: "Brecha",
    role: "Colaboración",
    logo: brechaLogo,
  },
  {
    id: "irad",
    name: "IRAD",
    role: "Colaboración",
    logo: iradLogo,
  },
  {
    id: "isstec",
    name: "ISSTEC",
    role: "Colaboración",
    logo: isstecLogo,
  },
] as const;
