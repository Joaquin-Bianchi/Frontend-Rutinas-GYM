import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

type UseApiOptions<P> = {
  autoFetch?: boolean;
  params: P;
};

type Data<T> = T | null;
type CustomError = Error | null;

interface UseApiResult<T, P> {
  loading: boolean;
  data: Data<T>;
  error: CustomError;
  fetch: (param: P) => void;
}

export const useApi = <T, P>(
  apiCall: (param: P) => Promise<AxiosResponse<T>>,
  options?: UseApiOptions<P>
): UseApiResult<T, P> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data<T>>(null);
  const [error, setError] = useState<CustomError>(null);

  const fetch = useCallback(
    (param: P) => {
      setLoading(true);

      apiCall(param)
        .then((response) => {
          setData(response.data);
          setError(null);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [apiCall]
  );

  useEffect(() => {
    if (options?.autoFetch) {
      return fetch(options.params);
    }
  }, [fetch, options?.autoFetch, options?.params]);

  return { loading, data, error, fetch };
};
