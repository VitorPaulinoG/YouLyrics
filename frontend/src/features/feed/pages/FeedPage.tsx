import { PostComposer } from '@/features/textual-production/components/PostComposer';
import { TextualProductionPostCard } from '@/features/textual-production/components/TextualProductionPostCard';
import { useTextualProductionsQuery } from '@/features/textual-production/api/textualProductionService';

export function FeedPage() {
  const { data, isError, isLoading } = useTextualProductionsQuery();

  if (isLoading) {
    return <div className="py-8 text-primary-02">Loading feed...</div>;
  }

  if (isError) {
    return <div className="py-8 text-primary-02">Unable to load feed right now.</div>;
  }

  return (
    <div className="flex flex-col gap-2.5">
      <PostComposer/>
      {data?.content.map((textualProduction) => (
        <TextualProductionPostCard key={textualProduction.id} textualProduction={textualProduction} />
      ))}
    </div>
  );
}
