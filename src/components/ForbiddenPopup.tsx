import { useState, useEffect } from "react";

export default function ForbiddenPopup({
  isNotFound
}: {
  isNotFound: boolean;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isNotFound) {
      setShow(true);
    }
  }, [isNotFound]);

  if (!show) return null;

  return (
    <div
      className={
        "fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]"
      }
    >
      <div
        className={
          "text-white bg-black p-8 rounded-lg align-center items-center min-h-1/6 border-4 flex flex-col justify-space-around"
        }
      >
        <h2 className={"text-3xl"}>Whoops :3</h2>
        <p>Page not found!</p>
        <button
          onClick={() => setShow(false)}
          className={"cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center text-black bg-white"}
        >
          Close
        </button>
      </div>
    </div>
  );
}
