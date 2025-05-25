const pluck = <T>(obj: Record<string, any>, key: string): T | undefined => {
  return key.split(".").reduce<any>((acc, curr) => {
    if (acc && typeof acc === "object" && curr in acc) {
      return acc[curr];
    }
    return undefined;
  }, obj) as T | undefined;
};

export default pluck;
