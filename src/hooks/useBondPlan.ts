import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bondApi, type TrainingPlan } from "@/services/bondApi";

const ATHLETE_ID = import.meta.env.VITE_BOND_ATHLETE_ID as string | undefined;

export function useBondPlan() {
  return useQuery<TrainingPlan | null>({
    queryKey: ["bond-plan", ATHLETE_ID],
    queryFn: () => (ATHLETE_ID ? bondApi.getAthletePlan(ATHLETE_ID) : null),
    enabled: !!ATHLETE_ID,
    staleTime: 30 * 1000,
  });
}

export function useToggleBondSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ planId, weekNumber, sessionIndex }: { planId: string; weekNumber: number; sessionIndex: number }) =>
      bondApi.toggleSession(planId, weekNumber, sessionIndex),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bond-plan", ATHLETE_ID] }),
  });
}
