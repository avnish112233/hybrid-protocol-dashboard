import { useQuery } from "@tanstack/react-query";
import { fetchWhoopSummary } from "@/services/wearablesFn";

// VITE_OW_USER_ID is set per-athlete in Vercel env vars (safe to expose — it's just a UUID, not a secret).
// Set OW_API_URL and OW_API_KEY as non-VITE server-side vars in Vercel.
const OW_USER_ID = import.meta.env.VITE_OW_USER_ID as string | undefined;

export function useWhoopData() {
  return useQuery({
    queryKey: ["whoop", OW_USER_ID],
    queryFn: () => fetchWhoopSummary({ data: OW_USER_ID! }),
    enabled: !!OW_USER_ID,
    staleTime: 5 * 60 * 1000,
  });
}
