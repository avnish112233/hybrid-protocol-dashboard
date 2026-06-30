import { useQuery } from "@tanstack/react-query";
import { fetchAthleteProfile, type AthleteProfile } from "@/services/athleteProfile";

const ATHLETE_ID = import.meta.env.VITE_BOND_ATHLETE_ID as string | undefined;

export function useAthleteProfile() {
  return useQuery<AthleteProfile>({
    queryKey: ["athlete-profile", ATHLETE_ID],
    queryFn: () => fetchAthleteProfile(ATHLETE_ID!),
    enabled: !!ATHLETE_ID,
    staleTime: 5 * 60 * 1000, // 5 min — re-fetches after new report uploaded
    retry: 1,
  });
}
