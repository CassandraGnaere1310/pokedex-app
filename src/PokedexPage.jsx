import { useEffect, useState } from "react";

function PokedexPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const limit = 20;

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);

      const offset = page * limit;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
      );
      const data = await response.json();

      setPokemonList(data.results);
      setLoading(false);
    }

    fetchPokemon();
  }, [page]);

  async function handlePokemonClick(name) {
    setDetailsLoading(true);

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    setPokemonDetails(data);
    setDetailsLoading(false);
  }

  return (
    <div className="pokedex-layout">
      <div className="pokemon-list-section">
        <h2>Pokedex Page</h2>

        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 0}>
            Previous
          </button>

          <span>Page {page + 1}</span>

          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="pokemon-list">
            {pokemonList.map((pokemon) => (
              <li key={pokemon.name}>
                <button
                  className="pokemon-name-button"
                  onClick={() => handlePokemonClick(pokemon.name)}
                >
                  {pokemon.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pokemon-details-section">
        <h2>Pokemon Details</h2>

        {detailsLoading && <p>Loading Pokémon details...</p>}

        {!pokemonDetails && !detailsLoading && (
          <p>Click a Pokémon to see its details.</p>
        )}

        {pokemonDetails && !detailsLoading && (
          <div className="pokemon-card">
            <h3>
              {pokemonDetails.name} #{pokemonDetails.id}
            </h3>

            <img
              src={pokemonDetails.sprites.front_default}
              alt={pokemonDetails.name}
            />

            <p>
              <strong>Height:</strong> {pokemonDetails.height}
            </p>

            <p>
              <strong>Weight:</strong> {pokemonDetails.weight}
            </p>

            <p>
              <strong>Types:</strong>{" "}
              {pokemonDetails.types.map((type) => type.type.name).join(", ")}
            </p>

            <p>
              <strong>Abilities:</strong>{" "}
              {pokemonDetails.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </p>

            <div>
              <strong>Stats:</strong>
              <ul>
                {pokemonDetails.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokedexPage;
