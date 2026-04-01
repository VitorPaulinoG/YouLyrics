import './SearchBar.scss';

export function SearchBar() {
  return (
    <label className="flex min-h-12 w-full flex-col justify-center rounded-lg bg-secondary-400">
      <div className="flex flex-row items-center">
        <div className="flex h-12 w-12 items-center justify-center">
          <span aria-hidden="true" className="material-icons text-primary-500">
            search
          </span>
        </div>
        <div className="w-full px-4 pl-1">
          <input
            className="w-full text-primary-500 placeholder:text-primary-300 focus-visible:border-none focus-visible:outline-none"
            placeholder="Search something"
            type="text"
          />
        </div>
      </div>
    </label>
  );
}
