import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Modal } from "semantic-ui-react";
import { RootStoreContext } from "../../stores/RootStore";

export const ModalContainer = observer(() => {
    const modalStore = useContext(RootStoreContext).modalStore;
    const {modal: {open, body}, closeModal} = modalStore;
    return (
        <Modal open={open} onClose={closeModal} size='large'>
            <Modal.Content>
                {body}
            </Modal.Content>
        </Modal>
    );
});
