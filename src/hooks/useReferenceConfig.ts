import { useQuery } from "@tanstack/react-query";
import { fetchReferenceConfig } from "@/services/referenceConfig";
import { DEFAULT_REFERENCE_CONFIG, type ReferenceConfig } from "@/lib/references";

export function useReferenceConfig(): ReferenceConfig {
  const { data } = useQuery<ReferenceConfig | null>({
    queryKey: ["reference-config"],
    queryFn: fetchReferenceConfig,
    staleTime: 60 * 60 * 1000, // 1 hour — these change very rarely
    placeholderData: DEFAULT_REFERENCE_CONFIG,
  });
  return data ?? DEFAULT_REFERENCE_CONFIG;
}
