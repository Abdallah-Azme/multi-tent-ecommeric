import { useQueryStates, parseAsString } from "nuqs";

export function useProductsFilter() {
  return useQueryStates({
    minPrice: parseAsString.withOptions({
      clearOnDefault: true,
    }),
    maxPrice: parseAsString.withOptions({
      clearOnDefault: true,
    }),
  });
}
