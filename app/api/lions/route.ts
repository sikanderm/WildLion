import lionData from "@/app/api/Data/liondb.lions.json";

export async function GET() {
  return Response.json(lionData);
}
