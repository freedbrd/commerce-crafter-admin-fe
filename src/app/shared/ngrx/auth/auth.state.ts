import { Session } from "@supabase/supabase-js";
import { IProfile } from "../../interfaces/profile.interface";

export interface AuthState {
  loading: boolean;
  session: Session | null;
  profile: IProfile | null;
}

export const initialAuthState: AuthState = {
  profile: null,
  loading: false,
  session: null
}
