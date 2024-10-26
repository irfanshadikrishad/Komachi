import Anime from "@/schema/anime"
import { database } from "@/utils/database"

export async function GET(request: Request) {
  try {
    await database()
    const distinct = await Anime.distinct("season")
    return new Response(JSON.stringify(distinct.reverse()), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
