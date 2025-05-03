import { CustomCategory } from "../types";
import Categories from "./categories";
import SearchInput from "./search-input";

interface Props {
  data: CustomCategory[];
}

export default async function SearchFilters({ data }: Props) {
  return (
    <section className="container mx-auto">
      <SearchInput data={data} />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </section>
  );
}
