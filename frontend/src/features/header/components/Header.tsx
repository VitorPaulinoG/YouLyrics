import { useMemo } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import { SearchBar } from '@/shared/ui/search-bar/SearchBar';
import { Icon } from '@/shared/ui/icon/Icon';
import { Menu, type MenuOption } from '@/shared/ui/menu/Menu';
import logoUrl from '@/assets/youlyrics-logo.svg';
import notificationIconUrl from '@/assets/icons/notification-icon.svg';
import profileIconUrl from '@/assets/icons/profile-icon.svg';

export function Header() {
  const { isAuthenticated, login, logout, userDisplayName } = useAuth();

  const menuOptions = useMemo<MenuOption[]>(
    () => [
      {
        iconConfig: {
          fontIcon: 'account_circle',
          isOutlined: true,
          roundedBackground: true,
        },
        title: userDisplayName ?? 'Profile',
        action: () => undefined,
      },
      {
        iconConfig: {
          fontIcon: 'logout',
          isOutlined: true,
          roundedBackground: true,
        },
        title: 'Logout',
        action: () => {
          void logout();
        },
      },
    ],
    [logout, userDisplayName],
  );

  return (
    <div className="flex flex-row rounded-lg bg-secondary-300 px-4 py-2 sm:px-8 sm:py-1">
      <img alt="YouLyrics Logo" height="48" src={logoUrl} />
      <div className="w-full px-3 sm:px-7">
        <SearchBar />
      </div>
      <div className="flex h-12 w-auto flex-row gap-2.5">
        <Icon
          className="h-10 w-10"
          iconConfig={{
            svgUrl: notificationIconUrl,
            iconName: 'notification',
            roundedBackground: true,
          }}
        />
        {isAuthenticated ? (
          <Menu menuOptions={menuOptions} menuPosition="Bottom-Left" sharpCornerStyle="Top-Right">
            <Icon
              className="h-10 w-10"
              iconConfig={{
                svgUrl: profileIconUrl,
                iconName: 'profile',
                roundedBackground: true,
              }}
            />
          </Menu>
        ) : (
          <button className="flex items-center gap-2.5 font-medium text-primary-500" onClick={() => void login('/')} type="button">
            <Icon
              className="h-10 w-10"
              iconConfig={{
                svgUrl: profileIconUrl,
                iconName: 'profile',
                roundedBackground: true,
              }}
            />
            <span className="text-[0.875rem]">Login</span>
          </button>
        )}
      </div>
    </div>
  );
}
