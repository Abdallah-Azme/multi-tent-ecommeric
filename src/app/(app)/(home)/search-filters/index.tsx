import { json } from "stream/consumers";
import SearchInput from "./search-input";
import Categories from "./categories";

interface Props {
  data: any;
}

export default async function SearchFilters({ data }: Props) {
  return (
    <section className="container mx-auto">
      <SearchInput />
      <Categories data={data} />
    </section>
  );
}
