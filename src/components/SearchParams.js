import { useState, useEffect } from 'react';
import Pet from './Pet';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [location, setLocation ] = useState("Seattle, WA");
  const [animal, setAnimal ] = useState("");
  const [breed, updateBreed] = useState("");
  const [pets, setPets] = useState([]);
  const breeds = [];




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
      <form>
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
            <option disabled key='default' value='default'> -- select an option -- </option>
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
            id="breed"
            value={breed}
            onChange={(e)=>{updateBreed(e.target.value)}}
            onBlur={(e)=>{updateBreed(e.target.value)}}
          >
            {breeds.map((breed)=>(
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {
        pets.map((pet)=>(
          <Pet
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            key={pet.id}
          />
        ))
      }
    </div>
  );
}

export default SearchParams;
