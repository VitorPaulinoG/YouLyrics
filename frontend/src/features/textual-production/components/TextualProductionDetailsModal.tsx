import type { TextualProduction } from '@/entities/textual-production/model/textualProduction';
import { TextualProductionMainContent } from '@/features/textual-production/components/TextualProductionMainContent';
import { Icon } from '@/shared/ui/icon/Icon';
import { IconButton } from '@/shared/ui/icon-button/IconButton';
import { Modal } from '@/shared/ui/modal/Modal';
import { TextInput } from '@/shared/ui/text-input/TextInput';
import profileRawIconUrl from '@/assets/icons/profile-raw-icon.svg';

type TextualProductionDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  textualProduction: TextualProduction;
};

export function TextualProductionDetailsModal({
  isOpen,
  onClose,
  textualProduction,
}: TextualProductionDetailsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-[45rem] max-h-[45rem] w-full max-w-[74rem] rounded-lg bg-secondary-300 lg:w-[74rem]">
        <div className="flex w-full justify-center pb-4">
          <div className="flex w-full justify-center overflow-scroll px-5 py-4">
            <TextualProductionMainContent textualProduction={textualProduction} />
          </div>
        </div>
        <hr className="h-full min-h-[1em] w-0 border-l border-primary-300" />
        <div className="flex h-full min-w-[22rem] flex-col py-4">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 px-2">
              <div className="flex items-center gap-2">
                <Icon
                  className="h-6 w-6"
                  iconConfig={{
                    svgUrl: profileRawIconUrl,
                    iconName: 'profile-raw',
                    roundedBackground: true,
                  }}
                />
                <div className="flex gap-1 text-[1rem]">
                  <span className="text-primary-600">{textualProduction.author.name}</span>
                  <span className="text-primary-300">|</span>
                  <span className="text-primary-500">2h</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-primary-500">
              <h2 className="flex flex-col whitespace-pre-line px-2 text-sm">{textualProduction.description}</h2>
              <div className="flex flex-col px-2 text-sm">
                <div className="flex gap-1">
                  <span className="font-medium">Literary Genre:</span>
                  <span className="font-normal">{textualProduction.literaryGenre}</span>
                </div>
                <div className="flex gap-1">
                  <span className="font-medium">Themes:</span>
                  <span className="font-normal">Religião, Humor</span>
                </div>
              </div>
              <div className="flex w-full flex-row items-center justify-between gap-2">
                <div className="flex">
                  <IconButton
                    iconConfig={{ fontIcon: 'thumb_up', isOutlined: true, roundedBackground: false }}
                    onClick={() => console.log('[ info ] - Like added')}
                  />
                  <IconButton
                    iconConfig={{ fontIcon: 'share', isOutlined: true, roundedBackground: false }}
                    onClick={() => console.log('[ info ] - Shared')}
                  />
                </div>
                <IconButton
                  iconConfig={{ fontIcon: 'bookmark_add', isOutlined: true, roundedBackground: false }}
                  onClick={() => undefined}
                />
              </div>
            </div>
            <TextInput
              className="w-full"
              iconConfig={{ fontIcon: 'comment', isOutlined: true, roundedBackground: false }}
              isRounded={false}
              placeholder="Comment about this textual production..."
            />
          </div>
          <hr className="w-full border-t border-primary-300" />
        </div>
      </div>
    </Modal>
  );
}
