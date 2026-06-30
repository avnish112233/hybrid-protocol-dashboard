import { useEffect, useState } from "react";

const KEY = "hp_auth";

export function isSignedIn(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(KEY) === "1";
}

export function signIn(phone: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, "1");
  window.localStorage.setItem("hp_phone", phone);
}

export function signOut() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  window.localStorage.removeItem("hp_phone");
}

export function useAuth() {
  const [authed, setAuthed] = useState<boolean>(false);
  useEffect(() => {
    setAuthed(isSignedIn());
  }, []);
  return { authed, signIn, signOut };
}