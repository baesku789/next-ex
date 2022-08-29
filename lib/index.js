import { useCallback, useEffect, useRef } from "react";

export function useInfiniteQuery(onIntersect, options) {
  const ref = useRef();

  const callback = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect(entry, observer);
        }
      });
    },
    [onIntersect]
  );

  useEffect(() => {
    let observer;

    if (ref.current) {
      observer = new IntersectionObserver(callback, {
        threshold: 1,
        ...options,
      });
      observer.observe(ref.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [ref, options, callback]);

  return ref;
}
