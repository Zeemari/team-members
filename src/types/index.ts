import { AxiosError } from "axios";

export type User = {
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
  id: number;
};

export type Response = {
  data: Array<User>;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

// export interface ErrorMessage extends AxiosError {
//   response: {
//     data: {
//       error: string;
//     };
//   };
// }
