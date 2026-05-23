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
          <h1 className="h-10 w-full text-left overflow-y-visible headline-3/primary-01">
            {textualProduction.title}
          </h1>
          <button
            className="h-auto w-full text-left body-2/primary-03 
              transition-[text-shadow] duration-200 ease-in-out 
              hover:cursor-pointer hover:[text-shadow:0_0_1px_var(--color-primary-03)]"
            onClick={() => console.log(`[ info ] - Going to ${textualProduction.author.name}'s page ('/author/${textualProduction.author.id}')`)}
            type="button"
          >
            {textualProduction.author.name}
          </button>
        </div>
        <div ref={contentRef} 
          className="textual-production-content flex flex-col gap-2.5"
        >
          {textualProduction.content.map((stanza, stanzaIndex) => (
            <div 
              className="whitespace-pre-line body-1/primary-02" 
              key={`${textualProduction.id}-stanza-${stanzaIndex}`}
            >
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
