import { getContext } from "@microsoft/power-apps/app";
import type User from "./powerUser";

export default async function getCurrentUser() {
  const ctx = await getContext();

  return {
    objectId: ctx.user.objectId, //Entra Object ID (GUID) - key
    upn: ctx.user.userPrincipalName, // e.g. jane.smith@holmes-hills.com
    fullName: ctx.user.fullName, //display name
    tenantId: ctx.user.tenantId,
  } as User;
}
