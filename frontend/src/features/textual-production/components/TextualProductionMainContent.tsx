import type { RefObject } from 'react';
import type { TextualProduction } from '@/entities/textual-production/model/textualProduction';

type TextualProductionMainContentProps = {
  textualProduction: TextualProduction;
  headerRef?: RefObject<HTMLDivElement | null>;
  contentRef?: RefObject<HTMLDivElement | null>;
};

export function TextualProductionMainContent({
  textualProduction,
  contentRef,
  headerRef,
}: TextualProductionMainContentProps) {
  return (
    <div className="flex flex-row justify-center overflow-y-hidden pb-4">
      <div className="flex flex-col gap-2 overflow-y-hidden">
        <div ref={headerRef} className="textual-production-header flex flex-col gap-2 overflow-y-visible">
          <h1 className="h-10 w-full overflow-y-visible text-[2.5rem]/[3rem] font-normal text-primary-600">
            {textualProduction.title}
          </h1>
          <button
            className="h-auto w-full text-left text-2xl/[1.75rem] text-primary-300 transition-[text-shadow] duration-200 ease-in-out hover:cursor-pointer hover:[text-shadow:0_0_1px_var(--color-primary-300)]"
            onClick={() => console.log(`[ info ] - Going to ${textualProduction.author.name}'s page ('/author/${textualProduction.author.id}')`)}
            type="button"
          >
            {textualProduction.author.name}
          </button>
        </div>
        <div ref={contentRef} className="textual-production-content flex flex-col gap-2.5 text-primary-500">
          {textualProduction.content.map((stanza, stanzaIndex) => (
            <div className="whitespace-pre-line text-[2rem]/[2.625rem]" key={`${textualProduction.id}-stanza-${stanzaIndex}`}>
              {stanza.map((verse, verseIndex) => (
                <p key={`${textualProduction.id}-verse-${stanzaIndex}-${verseIndex}`}>{verse}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
