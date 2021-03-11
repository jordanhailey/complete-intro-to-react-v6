import { useState, useEffect } from 'react';
import useBreedList from './useBreedList';
import Results from './Results';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [location, setLocation ] = useState("");
  const [animal, setAnimal ] = useState("");
  const [breed, updateBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds,] = useBreedList(animal);




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
          <input id="location" value={location} placeholder="Location" onChange={(e)=>{setLocation(e.target.value)}}/>
        </label>
        <label htmlFor="animal">
          Animal
          <select
            defaultValue='default'
            id="animal"
            onChange={(e)=>{setAnimal(e.target.value)}}
            onBlur={(e)=>{setAnimal(e.target.value)}}
          >
            <option disabled key='' value='default'> -- select an option -- </option>
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
            onChange={(e)=>{updateBreed(e.target.value)}}
            onBlur={(e)=>{updateBreed(e.target.value)}}
          >
            <option disabled key='' value='default'> -- select an option -- </option>
            {breeds.map((breed)=>(
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
}

export default SearchParams;
