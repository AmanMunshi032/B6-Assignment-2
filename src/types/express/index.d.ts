// declare namespace Express {
//   interface Request {
//     user?: {
//       id: number;
//       role: "admin" | "customer";
//       email: string;
//     };
//   }
// }
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}