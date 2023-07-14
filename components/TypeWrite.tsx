import { useEffect, useState } from "react";

export const TypeWrite = (props: { text: string }) => {
  const maxDelay = 250;

  const [delay, setDelay] = useState(maxDelay);
  const [title, setTitle] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title !== props.text) {
        setTitle(title + props.text[title.length]);
      }
      setDelay(Math.random() * maxDelay);
    }, delay);

    return () => clearTimeout(timer);
  }, [title, delay, props.text]);

  return <>{title}</>;
};
