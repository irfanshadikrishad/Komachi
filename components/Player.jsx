"use client"
import Automatics from "@/components/Automatics"
import Disqus from "@/components/Disqus"
import Episodes from "@/components/Episodes"
import Info from "@/components/Info"
import styles from "@/styles/player.module.css"
import { originWithEps } from "@/utils/helpers"
import { useEffect, useRef, useState } from "react"
// ICONS
import { FaClosedCaptioning } from "react-icons/fa6"
import { IoMic } from "react-icons/io5"
// VIDSTACK
import SeasonCard from "@/components/SeasonCard"
import { MediaPlayer, MediaProvider, Track } from "@vidstack/react"
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default"
import "@vidstack/react/player/styles/default/layouts/video.css"
import "@vidstack/react/player/styles/default/theme.css"
import Link from "next/link"

export default function Player({
  streamLink,
  dubLink,
  currentEpisode,
  episodeDownloadLink,
  episodes,
  getStreamLink,
  setStreamLink,
  animeInfo,
  episode,
  seasons,
  vtt,
}) {
  const [isClient, setIsClient] = useState(false)
  const [isSub, setIsSub] = useState(true)
  const [isMouseOver, setIsMouseOver] = useState(false)
  const [unicornEpisodes, setUnicornEpisodes] = useState(episodes)
  const [origin, setOrigin] = useState("")

  const playerRef = useRef(null)

  // Set isClient to true after the component is mounted on the client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Handle localStorage and dynamic origin logic
  useEffect(() => {
    if (isClient) {
      const storedType = localStorage.getItem("type")
      setIsSub(storedType ? storedType === "Sub" : true)
      if (window.location.href) {
        const o = originWithEps(window.location.href, currentEpisode)
        setOrigin(o)
      }
    }
  }, [isClient, dubLink, streamLink])

  // Update unicornEpisodes whenever episodes change
  useEffect(() => {
    setUnicornEpisodes(episodes)
  }, [episodes])

  // Reload the player when the streamLink or dubLink changes
  useEffect(() => {
    if (isClient && playerRef.current?.load) {
      playerRef.current.load()
    }
  }, [isClient, streamLink, dubLink])

  if (!isClient) return null

  return (
    <div>
      <section className={styles.playerTrajectory}>
        <section className={styles.streamingV2_ReactPlayer}>
          <div
            className={styles.player_Wrapper}
            onMouseOver={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}>
            <MediaPlayer
              ref={playerRef}
              title={episode?.title || ""}
              src={`https://goodproxy.goodproxy.workers.dev/fetch?url=${
                isSub || !dubLink ? streamLink : dubLink
              }`}
              load="eager"
              aspectRatio="16/9"
              viewType="video"
              streamType="on-demand"
              logLevel="warn"
              crossOrigin="anonymous"
              playsInline
              storage="storage-key"
              autoPlay>
              <MediaProvider />
              {vtt?.map((vT, idx) => (
                <Track
                  key={idx}
                  src={vT.file}
                  label={vT.label}
                  kind={vT.kind}
                />
              ))}
              <DefaultVideoLayout
                icons={defaultLayoutIcons}
                download={episodeDownloadLink}
              />
            </MediaPlayer>
            <section>
              <div
                className={styles.ed}
                style={{
                  display: isMouseOver ? "inline" : "none",
                  right: "16px",
                }}></div>
              <div
                className={styles.ed}
                style={{ display: isMouseOver ? "inline" : "none" }}></div>
            </section>
          </div>
          <Automatics />
          <div className={styles.external_sources}>
            <div className={styles.es1}>
              <p>
                You are watching
                <span className="primary">{` Episode ${episode?.number ? episode?.number : "?"}`}</span>
              </p>
              <p>
                If the current server doesn't work, please try other servers.
              </p>
            </div>
            <div className={styles.es2}>
              <div>
                <p>
                  <FaClosedCaptioning /> SUB
                </p>
                <div>
                  <button
                    style={{ color: isSub || !dubLink ? "var(--primary)" : "" }}
                    onClick={() => {
                      setStreamLink(streamLink)
                      setIsSub(true)
                      localStorage.setItem("type", "true")
                    }}>
                    Komachi 1
                  </button>
                </div>
              </div>
              {dubLink && (
                <div>
                  <p>
                    <IoMic /> DUB
                  </p>
                  <div>
                    <button
                      style={{ color: !isSub ? "var(--primary)" : "" }}
                      onClick={() => {
                        setStreamLink(dubLink)
                        setIsSub(false)
                        localStorage.setItem("type", "false")
                      }}>
                      Komachi 1
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        <Episodes
          unicornEpisodes={unicornEpisodes}
          getStreamLink={getStreamLink}
          currentEpisode={currentEpisode}
          streamLink={streamLink}
        />
      </section>
      <section className={styles.playerTrajectory}>
        <div>
          <Disqus url={origin} currentEpisode={currentEpisode} />
          <Info animeInfo={animeInfo} />
        </div>
        <div className={styles.thanks_Main}>
          <p>
            Thanks for watching. Consider subscribing to my{" "}
            <Link
              href="https://www.youtube.com/@irfanshadikrishad"
              target="_blank"
              className={styles.yt}>
              youtube
            </Link>{" "}
            channel.
          </p>
        </div>
      </section>
      <section className={styles.season_Main}>
        <h1>Seasons</h1>
        <div className={styles.seasonWrapper}>
          {seasons.length > 0 &&
            seasons.map(({ poster, id, name, title, isCurrent }, idx) => {
              return (
                <SeasonCard
                  key={idx}
                  id={id}
                  name={name}
                  title={title}
                  poster={poster}
                  isCurrent={isCurrent}
                />
              )
            })}
        </div>
      </section>
    </div>
  )
}
