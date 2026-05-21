import { Icon } from '../icon/Icon';
import './SearchBar.scss';

export function SearchBar() {
  return (
    <label className="flex min-h-12 w-full flex-col justify-center rounded-lg p-1 bg-secondary-03">
      <div className="flex flex-row items-center">
        <div className="flex h-12 w-12 items-center justify-center">
           <Icon
              className="h-12 w-12"
              iconConfig={{
                fontIcon: 'search',
                isOutlined: false,
                roundedBackground: false
              }}
            />
        </div>
        <div className="w-full px-4 pl-1">
          <input
            className="w-full hinttext-2/primary-02 placeholder:description-1/primary-03 focus-visible:border-none focus-visible:outline-none"
            placeholder="Search something"
            type="text"
          />
        </div>
      </div>
    </label>
  );
}
