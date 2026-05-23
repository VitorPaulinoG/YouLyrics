import clsx from 'clsx';
import './Icon.scss';

type SvgIconConfig = {
  svgUrl: string;
  iconName: string;
  fontIcon?: never;
  isOutlined?: boolean;
};

type FontIconConfig = {
  fontIcon: string;
  isOutlined: boolean;
  svgUrl?: never;
  iconName?: never;
};

type CommonIconConfig = {
  roundedBackground: boolean;
};

export type IconConfig = CommonIconConfig & (SvgIconConfig | FontIconConfig);

type IconProps = {
  iconConfig: IconConfig;
  className?: string;
};

export function Icon({ iconConfig, className }: IconProps) {
  return (
    <div className={className}>
      <div
        className={clsx(
          'flex items-center justify-center w-full h-full',
          iconConfig.roundedBackground && 'rounded-full bg-secondary-03 p-1',
        )}
      >
        {'svgUrl' in iconConfig ? (
          <img
            alt={iconConfig.iconName}
            className="h-full w-full object-contain"
            src={iconConfig.svgUrl}
          />
        ) : (
          <span
            aria-hidden="true"
            className={clsx(
              'flex h-full w-full items-center justify-center text-center',
              iconConfig.isOutlined ? 'material-icons-outlined' : 'material-icons',
            )}
          >
            {iconConfig.fontIcon}
          </span>
        )}
      </div>
    </div>
  );
}
