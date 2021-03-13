import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useBreedList from './useBreedList';
import Results from './Results';
import {changeLocation, changeAnimal, changeTheme, changeBreed} from '../actionCreators'

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const animal = useSelector(state=>state.animal);
  const breed = useSelector(state=>state.breed);
  const location = useSelector(state=>state.location);
  const theme = useSelector(state=>state.theme);
  const [pets, setPets] = useState([]);
  const [breeds,] = useBreedList(animal);
  const dispatch = useDispatch();




  useEffect(()=>{
    requestPets();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
      );
    const json = await res.json();

    setPets(json.pets);
  }

  function handleAnimalChange (e) {
    // Need better handling here
    if (e.target.value === "") {
      dispatch(changeBreed(""));
      dispatch(changeAnimal(e.target.value))
    }
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e)=>{
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input id="location" value={location} placeholder="Location" onChange={(e)=>dispatch(changeLocation(e.target.value))}/>
        </label>
        <label htmlFor="animal">
          Animal
          <select
            defaultValue='default'
            id="animal"
            onChange={(e)=>{handleAnimalChange(e)}}
            onBlur={(e)=>{handleAnimalChange(e)}}
          >
            {ANIMALS.map((animal)=>(
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            defaultValue='default'
            id="breed"
            onChange={(e)=>dispatch(changeBreed(e.target.value))}
            onBlur={(e)=>dispatch(changeBreed(e.target.value))}
          >
            {breeds.map((breed)=>(
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => dispatch(changeTheme(e.target.value))}
            onBlur={(e) => dispatch(changeTheme(e.target.value))}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
}

export default SearchParams;
