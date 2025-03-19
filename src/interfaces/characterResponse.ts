import { Character } from "./character"

export interface CharacterListResponse {
    info: Info
    results: Character[]
  }
  
  export interface Info {
    count: number
    pages: number
    next: string
    prev: any
  }
  
  