import lionData from "@/app/api/Data/liondb.sightings.json";

export async function GET() {
  return Response.json(lionData);
}
