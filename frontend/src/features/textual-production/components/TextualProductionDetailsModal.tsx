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
      <div className="flex h-180 max-h-180 w-296 max-w-296 rounded-lg bg-primary-06">
        <div className="flex w-full justify-center pb-4">
          <div className="flex w-full justify-center overflow-scroll px-5 py-4">
            <TextualProductionMainContent textualProduction={textualProduction} />
          </div>
        </div>
        <hr className="h-full min-h-[1em] w-0 border-l border-secondary-02" />
        <div className="flex h-full min-w-88 flex-col py-4">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 px-2">
              <div className="flex items-center gap-2 h-10">
                <Icon
                  className="min-h-6 min-w-6"
                  iconConfig={{
                    svgUrl: profileRawIconUrl,
                    iconName: 'profile-raw',
                    roundedBackground: true,
                  }}
                />
                <div className="flex items-center gap-1 text-[1rem]">
                  <span className="description-1/primary-02">{textualProduction.author.name}</span>
                  <span className="description-2/primary-03">|</span>
                  <span className="description-2/primary-02">2h</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-primary-02">
              <h2 className="flex flex-col whitespace-pre-line px-2 description-2">{textualProduction.description}</h2>
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
          <hr className="w-full border-t border-secondary-02" />
        </div>
      </div>
    </Modal>
  );
}
