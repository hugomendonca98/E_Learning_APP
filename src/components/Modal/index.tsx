/* eslint-disable react/require-default-props */
import React, { ReactNode } from 'react';
import { Modal } from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';

import {
  ModalContainer,
  OutModalStyle,
  InnerModal,
  ContentModal,
  TextModal,
  TextModalMessage,
} from './styles';

interface ModalProps {
  modalTitle: string;
  modalMessage?: string | undefined;
  children: ReactNode;
  modal: boolean;
  icon?: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalComponent: React.FC<ModalProps> = ({
  modalTitle,
  modalMessage = '',
  children,
  modal,
  icon,
  setModal,
}: ModalProps): JSX.Element => {
  return (
    <ModalContainer>
      <Modal
        animationType="fade"
        transparent
        visible={modal}
        onRequestClose={() => setModal(false)}
      >
        <OutModalStyle>
          <InnerModal>
            <ContentModal>
              {icon && <IconFeather name={icon} color="#FF6680" size={45} />}

              <TextModal>{modalTitle}</TextModal>
              {!!modalMessage && (
                <TextModalMessage>{modalMessage}</TextModalMessage>
              )}

              {children}
            </ContentModal>
          </InnerModal>
        </OutModalStyle>
      </Modal>
    </ModalContainer>
  );
};

export default ModalComponent;
