import { useGlobalContext } from "@/context/global";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "@/styles/Pokemon.module.css";
import Loading from "@/Components/Loading";

function Pokemon() {
  const router = useRouter();

  const { pokemon } = router.query;

  const { getPokemon, loading, pokemon: pokemonItem } = useGlobalContext();

  useEffect(() => {
    if (pokemon) {
      getPokemon(pokemon);
    }
  }, [pokemon]);

  let myLink = "";

  if (pokemonItem?.sprites?.other) {
    const { "official-artwork": link } = pokemonItem?.sprites?.other;
    myLink = link.front_default;
  }

  //pokemon bg colors
  const pkColors = [
    "#ADD8E6",
    "#90EE90",
    "#E6E6FA",
    "#B2FFFF",
    "#FFE0B2",
    "#C6E2B3",
    "#FFC0CB",
  ];

  const randomColor = pkColors[Math.floor(Math.random() * pkColors.length)];

  console.log(randomColor);

  return (
    <div
      className={styles.PokemonBg}
      style={{
        background: !loading && randomColor,
      }}
    >
      {!loading ? (
        pokemonItem && (
          <>
            <div className={styles.PokemonImage}>
              <img
                src={
                  pokemonItem?.sprites?.other?.home.front_default
                    ? pokemonItem?.sprites?.other?.home.front_default
                    : myLink
                }
                alt=""
              />
            </div>
            <div className={styles.PokemonBody}>
              <h2>{pokemonItem?.name}</h2>
              <div className={styles.PokemonInfo}>
                <div className={styles.PokemonInfoItem}>
                  <h5>Name:</h5>
                  <p>{pokemonItem?.name},</p>
                </div>

                <div className={styles.PokemonInfoItem}>
                  <h5>Type:</h5>
                  {pokemonItem?.types?.map((type) => {
                    return <p key={type.type.name}>{type.type.name},</p>;
                  })}
                </div>

                <div className={styles.PokemonInfoItem}>
                  <h5>Height:</h5>
                  <p>{pokemonItem?.height}</p>
                </div>

                <div className={styles.PokemonInfoItem}>
                  <h5>Abilities:</h5>
                  {pokemonItem?.abilities?.map((ability) => {
                    return (
                      <p key={ability.ability.name}>{ability.ability.name},</p>
                    );
                  })}
                </div>

                <div className={styles.PokemonInfoItem}>
                  <h5>Stats:</h5>
                  {pokemonItem?.stats?.map((stat) => {
                    return <p key={stat.stat.name}>{stat.stat.name},</p>;
                  })}
                </div>

                <div className={styles.PokemonInfoItem}>
                  <h5>A few moves:</h5>
                  {pokemonItem?.moves?.slice(0, 3).map((move) => {
                    return <p key={move.move.name}>{move.move.name},</p>;
                  })}
                </div>
              </div>
            </div>
          </>
        )
      ) : (
        <div className="loader">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default Pokemon;
