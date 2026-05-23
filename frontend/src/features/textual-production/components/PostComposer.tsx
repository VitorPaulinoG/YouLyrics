import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

export function PostComposer() {
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div 
      ref={containerRef} 
      onClick={() => setFocused(true)}
      className="flex w-full flex-col gap-[5px]"
    >
      <div className="w-full rounded-t-lg bg-primary-06 px-4 py-1 subtitle-2/primary-01">
        Create Your Textual Production
      </div>

      <form className={clsx(
        "w-full rounded-b-lg px-4 bg-secondary-03 transition-all duration-300 ease-out overflow-hidden",
        {
          "max-h-[300px] pt-2 pb-0": focused,
          "max-h-22 py-7 cursor-pointer": !focused
        }
      )}>
        <div className={clsx(
          "w-full transition-all duration-200",
          {
            "opacity-0 -translate-x-2 translate-y-0 h-0 pointer-events-none invisible": focused,
            "opacity-100 translate-x-0 translate-y-0 h-auto": !focused
          }
        )}>
          <input
            className="w-full description-1/primary-01 placeholder:hinttext-1/primary-02 focus-visible:border-none focus-visible:outline-none"
            placeholder="Write Something..."
            type="text"
            readOnly
          />
        </div>

        <div className={clsx(
          "flex flex-col gap-4 transition-all duration-300 delay-75",
          {
            "opacity-100 translate-x-0 translate-y-0 visible": focused,
            "opacity-0 -translate-x-2 translate-y-0 pointer-events-none invisible h-0": !focused
          }
        )}>
          <div className="grid grid-cols-[3rem_auto] gap-y-2.5 w-full">
            <span className="subtitle-2/primary-02">Title:</span>
            <input 
              className="description-2/primary-02 placeholder:text-primary-03 focus-visible:outline-none"
              type="text" 
              placeholder="Insert the title" 
            />
            <input
              className="w-full col-start-2 body-1/primary-01 placeholder:body-1/primary-02 focus-visible:border-none focus-visible:outline-none"
              placeholder="Write Something..."
              type="text"
              autoFocus
            />
          </div>

          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2.5 w-full">
              <div className="flex gap-2.5 w-auto">
                <span className="subtitle-2/primary-02">Literary Genre:</span>
                <input 
                  className="w-40 description-2/primary-02 placeholder:text-primary-03 focus-visible:outline-none"
                  type="text" 
                  placeholder="Genre" 
                />
              </div>
              <div className="flex gap-2.5">
                <span className="subtitle-2/primary-02">Themes:</span>
                <input 
                  className="description-2/primary-02 placeholder:text-primary-03 focus-visible:outline-none"
                  type="text" 
                  placeholder="Genre" 
                />
              </div>
            </div>
            <button className="subtitle-2/primary-02 px-2" onClick={(e) => e.stopPropagation()}>
              Criar
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}