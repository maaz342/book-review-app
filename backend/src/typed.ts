import { IUser } from '../models/User'; // Adjust the path based on your project structure

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Use `?` if the property is optional
    }
  }
}
