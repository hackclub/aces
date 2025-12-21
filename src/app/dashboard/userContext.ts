import { createContext } from "react";
import { User } from "@/app/dashboard/layout";

export const UserContext = createContext<User>(null);