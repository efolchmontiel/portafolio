export interface Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly stack: readonly string[];
  readonly gradient: string;
  readonly href?: string;
}
