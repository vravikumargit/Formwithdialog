import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISampleFormWithDialogProps {
  description: string;
  context: WebPartContext;
  siteurl: string;
}
