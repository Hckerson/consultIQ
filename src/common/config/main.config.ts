import { appConfig } from "./app.config";
import { leadConfig } from "./lead.config";

export default () => ({
  app: { ...appConfig },
  lead: { ...leadConfig },
});
