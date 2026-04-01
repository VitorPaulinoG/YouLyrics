export function PostComposer() {
  return (
    <div className="flex w-full flex-col gap-[5px]">
      <div className="w-full rounded-t-lg bg-secondary-300 px-4 py-1 font-medium text-primary-600">
        Create Your Textual Production
      </div>
      <label className="flex min-h-22 w-full flex-col justify-center rounded-b-lg bg-secondary-400">
        <div className="px-4">
          <input
            className="w-full text-xl text-primary-500 placeholder:text-primary-300 focus-visible:border-none focus-visible:outline-none"
            placeholder="Write Something..."
            type="text"
          />
        </div>
      </label>
    </div>
  );
}
