export function PostComposer() {
  return (
    <div className="flex w-full flex-col gap-[5px]">
      <div className="w-full rounded-t-lg bg-primary-06 px-4 py-1 
        subtitle-2/primary-01"
      >
        Create Your Textual Production
      </div>
      <label className="flex min-h-22 w-full flex-col justify-center rounded-b-lg 
        bg-secondary-03"
      >
        <div className="px-4">
          <input
            className="w-full description-1/primary-01 placeholder:hinttext-1/primary-02 
              focus-visible:border-none focus-visible:outline-none"
            placeholder="Write Something..."
            type="text"
          />
        </div>
      </label>
    </div>
  );
}
