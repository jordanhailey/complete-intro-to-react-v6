export type Animal = "dog" | "cat" | "bird" | "reptile" | "rabbit"; // Creating a type alias

export interface Pet { // creating an object shape
  id: number;
  name: string;
  animal: Animal;
  description: string;
  breed: string;
  images: string[];
  city: string;
  state: string;
}

export interface PetAPIResponse {
  numberOfResults: number;
  startIndex: number;
  endIndex: number;
  hasNext: boolean;
  pets: Pet[];
}

export interface ErrorState {
  hasError: boolean;
  redirect: boolean;
}

export interface ImageProps {
  images: string[]
}

export interface AnimalProps {
  name: string;
  animal: string;
  breed: string;
  images: string[];
  location: string;
  id: number;
}

export interface BreedListAPIResponse {
  animal: Animal;
  breeds: string[];
}

export type BreedAPIStatus = "loading" | "loaded" | "unloaded";
