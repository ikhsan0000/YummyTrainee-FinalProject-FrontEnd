import { View, Text, Modal } from 'react-native';
import React from 'react';

interface ModalBoxProps {
    modalVisible: boolean
}


const ModalBox = ({modalVisible}: ) => {
  return (
    <>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
         
        }}
        >

        </Modal>
    </>
  );
};

export default ModalBox;
