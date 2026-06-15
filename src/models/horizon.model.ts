export interface HorizonAnchor {
  readonly left: number;
  readonly bottom: number;
}

export interface HorizonStoryState {
  readonly contactPhase: number;
  readonly ninoOpacity: number;
  readonly telescopioOpacity: number;
  readonly isTelescopio: boolean;
  readonly ninoParallax: string;
  readonly telescopioParallax: string;
}
