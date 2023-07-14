import useSWR from "swr"

export function useMetas() {

    const fetcher = (args: string) => fetch(args).then(res => res.json())
    const { data, error, isLoading } = useSWR(`/api/metas`,  fetcher)

    return {
      metas: data,
      isLoading,
      isError: error
    }
  }