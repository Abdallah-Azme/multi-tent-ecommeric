import { Checkbox } from "@/components/ui/checkbox";
import { useTRPC } from "@/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";

interface TagsFilterProps {
  value?: string[] | null;
  onChange: (value: string[]) => void;
}

export default function TagsFilter({ onChange, value }: TagsFilterProps) {
  const trpc = useTRPC();
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteQuery(
      trpc.tags.getMany.infiniteQueryOptions(
        {
          limit: Number(
            process.env.NEXT_PUBLIC_NUMBER_OF_PAGNATIED_ITEMES_PER_PAGE
          ),
        },
        {
          getNextPageParam: (lastPage) =>
            lastPage.docs.length > 0 ? lastPage.nextPage : undefined,
        }
      )
    );

  const onClick = (tag: string) => {
    if (value?.includes(tag)) {
      onChange(value.filter((t) => t !== tag) || []);
    } else {
      onChange([...(value || []), tag]);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <LoaderIcon className="size-4 animate-spin" />
        </div>
      ) : (
        data?.pages.map((page) =>
          page.docs.map((tag) => (
            <div
              className="flex items-center justify-between cursor-pointer"
              key={tag.id}
              onClick={() => onClick(tag.name)}
            >
              <p className="font-medium">{tag.name}</p>
              <Checkbox
                checked={value?.includes(tag.name)}
                onCheckedChange={() => onClick(tag.name)}
              />
            </div>
          ))
        )
      )}
      {hasNextPage && (
        <button
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="underline font-medium justify-start text-start disabled:opacity-50 cursor-pointer"
          type="button"
        >
          Load more...
        </button>
      )}
    </div>
  );
}
