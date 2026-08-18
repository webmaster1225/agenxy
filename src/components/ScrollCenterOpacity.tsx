"use client";

import {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

const GroupContext = createContext<{
  items: MutableRefObject<Map<string, HTMLElement>>;
  activeId: string | null;
  requestUpdate: () => void;
} | null>(null);

export function ScrollCenterOpacityGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const items = useRef(new Map<string, HTMLElement>());
  const [activeId, setActiveId] = useState<string | null>(null);
  const frame = useRef(0);

  const update = useCallback(() => {
    const viewportCenter = window.innerHeight / 2;
    let closestId: string | null = null;
    let closestDistance = Infinity;

    items.current.forEach((el, id) => {
      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(elementCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestId = id;
      }
    });

    setActiveId((current) => (current === closestId ? current : closestId));
    frame.current = 0;
  }, []);

  const requestUpdate = useCallback(() => {
    if (frame.current) return;
    frame.current = window.requestAnimationFrame(update);
  }, [update]);

  useEffect(() => {
    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, [requestUpdate]);

  const value = useMemo(
    () => ({ items, activeId, requestUpdate }),
    [activeId, requestUpdate],
  );

  return (
    <GroupContext.Provider value={value}>
      <div className={className}>{children}</div>
    </GroupContext.Provider>
  );
}

export function ScrollCenterOpacity({
  children,
  className = "",
  minOpacity = 0.12,
}: {
  children: ReactNode;
  className?: string;
  minOpacity?: number;
}) {
  const id = useId();
  const ref = useRef<HTMLDivElement | null>(null);
  const group = useContext(GroupContext);
  const items = group?.items;
  const requestUpdate = group?.requestUpdate;
  const [opacity, setOpacity] = useState(minOpacity);

  useEffect(() => {
    if (!items || !requestUpdate || !ref.current) return;

    items.current.set(id, ref.current);
    requestUpdate();
    return () => {
      items.current.delete(id);
      requestUpdate();
    };
  }, [items, requestUpdate, id]);

  useEffect(() => {
    if (group) return;

    let frame = 0;

    const updateOpacity = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = Math.abs(elementCenter - viewportCenter);
      const maxDistance = window.innerHeight * 0.18;
      const progress = Math.max(0, 1 - distance / maxDistance);
      const nextOpacity = minOpacity + (1 - minOpacity) * progress;

      setOpacity(nextOpacity);
      frame = 0;
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateOpacity);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [group, minOpacity]);

  const resolvedOpacity = group ? (group.activeId === id ? 1 : minOpacity) : opacity;

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: resolvedOpacity, transition: "opacity 220ms ease-out", willChange: "opacity" }}
    >
      {children}
    </div>
  );
}
