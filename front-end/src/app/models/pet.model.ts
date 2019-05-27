import { PetTags } from './petTags.model';
import { PetCategory } from './petCategory.model';

export class Pet {
    constructor(
        public id: string,
        public category: PetCategory,
        public name: string,
        public photoUrls: string[],
        public tags: PetTags[],
        public status: string) {}
}

// {
//     "id": 0,
//     "category": {
//       "id": 0,
//       "name": "string"
//     },
//     "name": "doggie",
//     "photoUrls": [
//       "string"
//     ],
//     "tags": [
//       {
//         "id": 0,
//         "name": "string"
//       }
//     ],
//     "status": "available"
//   }
