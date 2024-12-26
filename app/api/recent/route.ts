export async function POST(request: Request) {
  try {
    const data = await fetch(`${process.env.HIANIME}/api/v2/hianime/home`)
    const response = await data.json()

    return new Response(JSON.stringify(response.data.latestEpisodeAnimes), {
      status: 200,
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `${(error as Error).message}` }),
      { status: 500 }
    )
  }
}
