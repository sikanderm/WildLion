import lionData from "@/app/api/Data/liondb.lionprofiles.json";

export async function GET() {
  return Response.json(lionData);
}
