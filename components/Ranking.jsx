import styles from "@/styles/latest.module.css";
// ICONS
import { TbMicrophoneFilled } from "react-icons/tb";
import { FaClosedCaptioning } from "react-icons/fa6";
import { CgMediaLive } from "react-icons/cg";
import { useState } from "react";
import Link from "next/link";

export default function Ranking({ popular, trending }) {
  const [rank, setRank] = useState(popular);

  return (
    <section className="home_ranking">
      <section className="home_popular">
        <div className="latest_Header">
          <p className="partitionTitleII">Ranking</p>
          <div className={styles.ranking_Changers}>
            <button
              style={{ color: rank === popular && "var(--primary)" }}
              onClick={() => {
                setRank(popular);
              }}
            >
              Popular
            </button>
            <button
              style={{ color: rank === trending && "var(--primary)" }}
              onClick={() => {
                setRank(trending);
              }}
            >
              Trending
            </button>
          </div>
        </div>
        <section className={styles.ranking_wrapper}>
          {rank[0]?.anilistId && (
            <Link href={`/watch/${rank[0].anilistId}`}>
              <div className={styles.rank1_container}>
                {rank[0]?.poster && (
                  <img
                    src={`${rank[0]?.poster}`}
                    alt={`${
                      rank[0].title?.english
                        ? rank[0].title?.english
                        : rank[0].title?.romaji
                    }`}
                    className={styles.rank1_image}
                    draggable="false"
                  />
                )}
                <div className={styles.rank_Main}>
                  <div className={styles.rank_Number}>
                    <h4>1</h4>
                  </div>
                  <div>
                    <h3 className={styles.rank1_name}>
                      {rank[0].title?.english
                        ? String(rank[0].title?.english).slice(0, 23)
                        : String(rank[0].title?.romaji).slice(0, 23)}
                    </h3>
                    <div className={styles.rank_details}>
                      <div className={styles.episodes_count}>
                        <div className={styles.count_Wrapper}>
                          {<FaClosedCaptioning />}
                          {rank[0].sub_episodes?.length}
                        </div>
                        {rank[0].dub_episodes?.length > 0 && (
                          <div className={styles.count_Wrapper}>
                            {<TbMicrophoneFilled />}
                            {rank[0].dub_episodes?.length}
                          </div>
                        )}
                        <div className={styles.count_Wrapper}>
                          {<CgMediaLive />}
                          {rank[0]?.totalEpisodes}
                        </div>
                      </div>
                      <p>•</p>
                      <p>{rank[0]?.format}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}
          <section className={styles.other_ranks}>
            {rank.map(
              (
                {
                  title,
                  sub_episodes,
                  dub_episodes,
                  format,
                  totalEpisodes,
                  poster,
                  anilistId,
                },
                index
              ) => {
                if (index !== 0) {
                  return (
                    <div key={index + 1}>
                      <Link
                        href={`/watch/${anilistId}`}
                        className={styles.rank_Main_Others}
                      >
                        <section className={styles.rankin}>
                          <div
                            className={`${styles.rank_Number} ${styles.rank_Number_Others}`}
                          >
                            <h4>{index + 1}</h4>
                          </div>
                          <div>
                            <h4 className={styles.others_rank}>
                              {title?.english ? title?.english : title?.romaji}
                            </h4>
                            <div className={styles.rank_details}>
                              <div className={styles.episodes_count}>
                                <div className={styles.count_Wrapper}>
                                  {<FaClosedCaptioning />}
                                  {sub_episodes?.length}
                                </div>
                                {dub_episodes.length > 0 && (
                                  <div className={styles.count_Wrapper}>
                                    {<TbMicrophoneFilled />}
                                    {dub_episodes?.length}
                                  </div>
                                )}
                                <div className={styles.count_Wrapper}>
                                  {<CgMediaLive />}
                                  {totalEpisodes}
                                </div>
                              </div>
                              <p>•</p>
                              <p>{format}</p>
                            </div>
                          </div>
                        </section>
                        <img
                          className={styles.others_Poster}
                          src={`${poster}`}
                        />
                      </Link>
                    </div>
                  );
                }
              }
            )}
          </section>
        </section>
      </section>
    </section>
  );
}
