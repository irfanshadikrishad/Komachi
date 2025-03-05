import Anime from "@/schema/anime"
import { database } from "@/utils/database"
import { client, redis } from "@/utils/redis"

export async function GET() {
  try {
    await database()
    await redis.Connect()

    const cache_Key = "distinct.year"
    const cachedData = await client.get(cache_Key)

    if (cachedData) {
      console.warn("[REDIS] Cache hit")
      return new Response(cachedData, { status: 200 })
    }

    console.warn("[REDIS] Cache miss")

    const distinct = await Anime.distinct("airing_start.year")

    await client.set(cache_Key, JSON.stringify(distinct.reverse()), {
      EX: 21600,
    })

    return new Response(JSON.stringify(distinct.reverse()), { status: 200 })
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error || "An error occurred" }),
      { status: 500 }
    )
  }
}
