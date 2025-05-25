import { useEffect, useRef, useState } from "react";
import useRenderTrigger from "./useRenderTrigger";
import useRequest from "./useRequest";

interface Props<T> {
  initialData?: T;
  url?: string;
  payload?: any;
  dependencies?: any[];
  conditions?: boolean;
  noRt?: boolean;
  initialPage?: number;
  initialLimit?: number;
  intialOffset?: number;
  // withLimit?: boolean;
  // withPagination?: boolean;
}

const useDataState = <T>({
  initialData,
  payload,
  url,
  dependencies = [],
  conditions = true,
  noRt = false,
  initialPage = 1,
  initialLimit = 10,
  intialOffset = 0,
}: Props<T>) => {
  // States
  const [data, setData] = useState<T | undefined>(initialData);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loadingLoadMore, setLoadingLoadMore] = useState<boolean>(false);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [offset, setOffset] = useState(intialOffset);
  const [pagination, setPagination] = useState<any>(undefined);
  const { rt } = useRenderTrigger();
  const { req, response, loading, error, status } = useRequest({
    id: url || "data-state",
    showLoadingToast: false,
  });

  // Requset function
  const method = payload ? "POST" : "GET";
  const payloadData = {
    ...payload,
    limit: limit,
  };
  const baseConfig = {
    method,
    url: `${url}${limit > 0 && `?page=${page}`}`,
    data: method === "POST" ? payloadData : undefined,
  };
  const abortControllerRef = useRef<AbortController | null>(null);
  function makeRequest() {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const config = {
      ...baseConfig,
      signal: abortController.signal,
    };
    setData(undefined);
    req({
      config,
      onResolve: {
        onSuccess: (r) => {
          setData(r?.data?.data);
          setPagination(r?.data?.pagination);
          setInitialLoading(false);
        },
      },
    });
  }
  function loadMore() {
    setLoadingLoadMore(true);

    const config = {
      ...baseConfig,
    };
    req({
      config,
      onResolve: {
        onSuccess: (r) => {
          const newData = data
            ? [...(data as any[]), ...r?.data?.data]
            : r?.data?.data;
          setData(newData);
          setPagination(r?.data?.pagination);
          setLoadingLoadMore(false);
        },
      },
    });
  }

  // Handle request via useEffect
  useEffect(() => {
    if (conditions && url) {
      makeRequest();
    }
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [
    conditions,
    url,
    page,
    limit,
    ...(noRt ? [] : [rt]),
    ...(dependencies || []),
  ]);

  return {
    data,
    setData,
    initialLoading,
    loading,
    error,
    loadMore,
    loadingLoadMore,
    setLoadingLoadMore,
    pagination,
    page,
    setPage,
    limit,
    setLimit,
    offset,
    setOffset,
    response,
    status,
  };
};

export default useDataState;
