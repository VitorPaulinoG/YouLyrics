import { useState, useRef, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { Icon } from '@/components/ui/icon/Icon';
import { Snackbar } from '@/components/ui/snackbar/Snackbar';
import { useCreateTextualProduction } from '../hooks/useCreateTextualProduction';

export function PostComposer() {
  const [focused, setFocused] = useState(false);
  const [title, setTitle] = useState('');
  const [stanzas, setStanzas] = useState(['']);
  const [literaryGenre, setLiteraryGenre] = useState('');
  const [themes, setThemes] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { mutate: createTextualProduction } = useCreateTextualProduction();

  const allEmpty = title === '' && stanzas.every((s) => s === '') && literaryGenre === '' && themes === '';

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (allEmpty) setFocused(false);
      }
    },
    [allEmpty],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  function handleAddStanza(afterIndex: number) {
    setStanzas((prev) => {
      const next = [...prev];
      next.splice(afterIndex + 1, 0, '');
      return next;
    });
    setHoveredIndex(null);
  }

  function handleStanzaChange(index: number, value: string) {
    setStanzas((prev) => prev.map((s, i) => (i === index ? value : s)));
  }

  function autoResize(el: HTMLTextAreaElement) {
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const content = stanzas
      .map((stanza) => stanza.split('\n').filter((line) => line.trim() !== ''))
      .filter((stanza) => stanza.length > 0);

    const parsedThemes = themes
      .split(/[,\n]/)
      .map((t) => t.trim())
      .filter((t) => t !== '');

    createTextualProduction(
      { title, content, literaryGenre, themes: parsedThemes },
      {
        onSuccess: () => {
          setTitle('');
          setStanzas(['']);
          setLiteraryGenre('');
          setThemes('');
          setFocused(false);
          setSnackbarVisible(true);
        },
      },
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        onClick={() => setFocused(true)}
        className="flex w-full flex-col gap-[5px]"
      >
        <div className="w-full rounded-t-lg bg-primary-06 px-4 py-1 subtitle-2/primary-01">
          Create Your Textual Production
        </div>

        <form
          onSubmit={handleSubmit}
          className={clsx(
            'w-full rounded-b-lg px-4 bg-secondary-03 overflow-hidden',
            focused ? 'pt-2 pb-0' : 'py-7 cursor-pointer',
          )}
        >
          {/* Placeholder state */}
          <div
            className={clsx('w-full transition-all duration-200 ease-out', {
              'opacity-0 -translate-x-4 h-0 pointer-events-none': focused,
              'opacity-100 translate-x-0 h-auto': !focused,
            })}
          >
            <span className="w-full hinttext-1/primary-02">Write Something...</span>
          </div>

          {/* Focused state — all fields */}
          <div
            className={clsx('flex flex-col gap-4 transition-all duration-200 ease-out', {
              'opacity-100 translate-x-0 visible': focused,
              'opacity-0 -translate-x-4 pointer-events-none invisible h-0': !focused,
            })}
          >
            <div className="grid grid-cols-[3rem_auto] gap-y-2.5 w-full">
              <span className="subtitle-2/primary-02">Title:</span>
              <input
                data-testid="textual-production__title"
                className="description-2/primary-02 placeholder:text-primary-03 focus-visible:outline-none bg-transparent"
                type="text"
                placeholder="Insert the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {/* Content stanzas */}
              <div className="col-start-2 flex flex-col">
                {stanzas.map((stanza, index) => (
                  <div key={index} className="flex flex-col">
                    <textarea
                      data-testid="textual-production__content"
                      className="w-full body-1/primary-01 placeholder:body-1/primary-02 focus-visible:border-none focus-visible:outline-none resize-none overflow-hidden bg-transparent"
                      placeholder="Write Something..."
                      value={stanza}
                      rows={1}
                      autoFocus={index === 0 && focused}
                      onChange={(e) => {
                        handleStanzaChange(index, e.target.value);
                        autoResize(e.target);
                      }}
                      onInput={(e) => autoResize(e.currentTarget)}
                    />

                    {/* Add-stanza hover zone */}
                    <div
                      data-testid={`textual-production__add-zone-${index}`}
                      className="relative h-4 flex items-center cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddStanza(index);
                      }}
                    >
                      {hoveredIndex === index && (
                        <div
                          data-testid={`textual-production__add-divider-${index}`}
                          className="absolute inset-x-0 flex items-center"
                        >
                          <div className="flex-1 h-px bg-primary-03" />
                          <Icon
                            iconConfig={{ fontIcon: 'add', isOutlined: false, roundedBackground: false }}
                            className="w-4 h-4 text-primary-02 mx-1"
                          />
                          <div className="flex-1 h-px bg-primary-03" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-2.5 w-full flex-wrap">
                <div className="flex gap-2.5 w-auto">
                  <span className="subtitle-2/primary-02">Literary Genre:</span>
                  <input
                    data-testid="textual-production__genre"
                    className="w-40 description-2/primary-02 placeholder:text-primary-03 focus-visible:outline-none bg-transparent"
                    type="text"
                    placeholder="Genre"
                    value={literaryGenre}
                    onChange={(e) => setLiteraryGenre(e.target.value)}
                  />
                </div>
                <div className="flex gap-2.5">
                  <span className="subtitle-2/primary-02">Themes:</span>
                  <input
                    data-testid="textual-production__theme"
                    className="description-2/primary-02 placeholder:text-primary-03 focus-visible:outline-none bg-transparent"
                    type="text"
                    placeholder="Theme1, Theme2"
                    value={themes}
                    onChange={(e) => setThemes(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="subtitle-2/primary-02 px-2"
                onClick={(e) => e.stopPropagation()}
              >
                Criar
              </button>
            </div>
          </div>
        </form>
      </div>

      <Snackbar
        message="Textual Production created successfully!"
        visible={snackbarVisible}
        onClose={() => setSnackbarVisible(false)}
      />
    </>
  );
}
