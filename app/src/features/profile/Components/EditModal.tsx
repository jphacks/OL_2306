import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Box } from '@chakra-ui/react';
import { FC } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import type { GetProfileAPIResponse } from '../types/GetProfileAPIResponse';
import { SettingForm } from './SettingForm';

interface SettingModalProps {
    userId: string
    userInfo: GetProfileAPIResponse,
    setUserInfo: (userInfo: GetProfileAPIResponse) => void
}
export const SettingModal: FC<SettingModalProps> = ({ userId, userInfo, setUserInfo }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <>
            <Button onClick={onOpen}>
                <AiFillEdit />
            </Button>
            {/* モーダルの横幅を画面いっぱいに */}
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent h='80%' maxW='80%' >
                    <ModalHeader />
                    <ModalBody >
                        <SettingForm userId={userId} userInfo={userInfo} setUserInfo={setUserInfo} onClose={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
