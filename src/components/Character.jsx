import React, { useEffect, useReducer, useState, useMemo } from "react";

//creamos el estado inicial
const initialState = {
  favorites: [],
};

//creamos la logica del reducer para agregar a la lista de favoritos
//pasamos el estado y la accion (nombre de la accion)
const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

const Character = () => {
  const [characters, setCharacters] = useState([]);
  //creamos el reducer que hace el llamado a favoriteReducer que es la funcion en concreto del reducer y el valor inicial que es initialState
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  //estado par el usememo
  const [search, setSearch] = useState("");

  //accion que se carga una sola vez
  useEffect(() => {
    //hacemos el llamado a la api, esperando una respuesta
    fetch("https://rickandmortyapi.com/api/character/")
      //la transformamos en un json
      .then((response) => response.json())
      //se la enviamos al hooks de estado
      .then((data) => setCharacters(data.results));
  }, []);

  //creamos la funcion que contiene el nombre o tipo del case o el payload que el objeto el cual hara uso el reducer
  const handleCLick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  };

  //funcion para capturar el valor del input
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  //funcion para filtrar usuario del characters que viene del useEffect, pasando por parametro el user
  // const filteredUsers = characters.filter((user) => {
  //   //retornamos el nombre del user y verificamos si lo que esta en search esta incluido en user name
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // });

  const filteredUsers = useMemo(
    () =>
      characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [characters, search]
  );

  return (
    <div className="Character">
      {favorites.favorites.map((favorite) => (
        <li key={favorite.id}>{favorite.name}</li>
      ))}

      <div className="Search">
        {/*  */}
        <input type="text" value={search} onChange={handleSearch} />
      </div>

      {filteredUsers.map((character) => (
        <div className="item" key={character.id}>
          <h2>{character.name}</h2>
          <button type="button" onClick={() => handleCLick(character)}>
            Agregar a Favoritos
          </button>
        </div>
      ))}
    </div>
  );
};

export default Character;
