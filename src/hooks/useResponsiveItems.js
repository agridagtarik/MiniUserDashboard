import { useState, useEffect } from "react";

export function useResponsiveItems(defaultItems) {
  const [items, setItems] = useState(defaultItems);

  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth >= 1400) setItems(12);
      else if (window.innerWidth >= 1200) setItems(10);
      else if (window.innerWidth >= 1024) setItems(8);
      else if (window.innerWidth >= 768) setItems(6);
      else setItems(2);
    };

    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  return items;
}
