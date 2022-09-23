import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICrudNetProps {
  description: string;
  hasTeamsContext: boolean;
  wpContext: WebPartContext;
}
