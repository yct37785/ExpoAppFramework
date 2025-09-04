import axios from "axios";
import { SampleInterface, SampleClass } from "./sampleTypes";

export function sampleFunction(input: SampleInterface): SampleClass {
  return new SampleClass(input.id, input.name.toUpperCase());
}

// async function that fetches from a public API
export async function fetchSampleUser(): Promise<SampleClass> {
  // call a free public API
  const response = await axios.get("https://jsonplaceholder.typicode.com/users/1");

  const user = response.data;
  // map the API result into our SampleClass
  return new SampleClass(user.id.toString(), user.name);
}
