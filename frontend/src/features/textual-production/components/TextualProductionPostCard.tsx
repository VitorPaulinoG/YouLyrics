import { useEffect, useMemo, useRef, useState } from 'react';
import type { TextualProduction } from '@/entities/textual-production/model/textualProduction';
import { TextualProductionDetailsModal } from '@/features/textual-production/components/TextualProductionDetailsModal';
import { TextualProductionMainContent } from '@/features/textual-production/components/TextualProductionMainContent';
import { IconButton } from '@/shared/ui/icon-button/IconButton';
import { Menu, type MenuOption } from '@/shared/ui/menu/Menu';
import { TextInput } from '@/shared/ui/text-input/TextInput';
import './TextualProductionPostCard.scss';

type TextualProductionPostCardProps = {
  textualProduction: TextualProduction;
};

export function TextualProductionPostCard({ textualProduction }: TextualProductionPostCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const [hasOverflow, setHasOverflow] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const options = optionsRef.current;
    const content = contentRef.current;
    const header = headerRef.current;

    if (!container || !options || !content || !header) {
      return undefined;
    }

    const observer = new ResizeObserver(() => {
      const nextHasOverflow =
        content.scrollHeight > container.clientHeight - (options.clientHeight + header.clientHeight);

      setHasOverflow(nextHasOverflow);
    });

    observer.observe(content);
    observer.observe(container);
    observer.observe(options);
    observer.observe(header);

    return () => observer.disconnect();
  }, [textualProduction]);

  const menuOptions = useMemo<MenuOption[]>(
    () => [
      {
        iconConfig: {
          fontIcon: 'bookmark_add',
          isOutlined: true,
          roundedBackground: true,
        },
        title: 'Save',
        action: () => undefined,
      },
      {
        iconConfig: {
          fontIcon: 'info',
          isOutlined: true,
          roundedBackground: true,
        },
        title: 'Details',
        action: () => setIsDetailsOpen(true),
      },
      {
        iconConfig: {
          fontIcon: 'link',
          isOutlined: true,
          roundedBackground: true,
        },
        title: 'Copy Link',
        action: async () => {
          await navigator.clipboard.writeText(window.location.href);
        },
      },
    ],
    [],
  );

  return (
    <>
      <div ref={containerRef} className="flex h-auto max-h-224 flex-col rounded-lg bg-secondary-300 pt-8">
        <div className="scroll-container h-full overflow-y-hidden px-9">
          <TextualProductionMainContent contentRef={contentRef} headerRef={headerRef} textualProduction={textualProduction} />
          <button
            aria-label="Open details"
            className={`overflow-effect-element ${hasOverflow ? 'is-visible' : ''}`}
            onClick={() => setIsDetailsOpen(true)}
            type="button"
          />
        </div>
        <div ref={optionsRef} className="flex w-full flex-row items-center gap-2 px-4 py-2">
          <IconButton
            iconConfig={{ fontIcon: 'thumb_up', isOutlined: true, roundedBackground: false }}
            onClick={() => console.log('[ info ] - Like added')}
          />
          <div className="w-full">
            <TextInput
              iconConfig={{ fontIcon: 'comment', isOutlined: true, roundedBackground: false }}
              placeholder="Comment about this textual production..."
            />
          </div>
          <IconButton
            iconConfig={{ fontIcon: 'share', isOutlined: true, roundedBackground: false }}
            onClick={() => console.log('[ info ] - Shared')}
          />
          <Menu menuOptions={menuOptions} menuPosition="Top-Left" sharpCornerStyle="Bottom-Right">
            <IconButton iconConfig={{ fontIcon: 'more_vert', isOutlined: true, roundedBackground: false }} />
          </Menu>
        </div>
      </div>
      <TextualProductionDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        textualProduction={textualProduction}
      />
    </>
  );
}
