import { useState } from 'react';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [location, setLocation ] = useState("Portland, OR");
  const [animal, setAnimal ] = useState("");
  const [breed, updateBreed] = useState("");
  const breeds = [];

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
            id="animal"
            value={animal}
            onChange={(e)=>{setAnimal(e.target.value)}}
            onBlur={(e)=>{setAnimal(e.target.value)}}
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
    </div>
  );
}

export default SearchParams;
