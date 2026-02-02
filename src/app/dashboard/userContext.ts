import type { User } from "@/app/dashboard/layout";
import { createContext } from "react";

export default createContext<User>(null);
