import React, { useEffect, useState } from 'react';
import { Portal, Dialog, Button, Text } from 'react-native-paper';
import { getGlobalAlert, setGlobalAlert } from '../../store';

const GlobalAlert = () => {
  const getAlertState = getGlobalAlert();
  const setAlertState = setGlobalAlert();
  const [dialog, setDialog] = useState(getAlertState);

  const onDismiss = () => {
    setAlertState({ visible: false, message: dialog.message });
    setDialog({ visible: false, message: dialog.message });
  }

  useEffect(() => {
    setDialog(getAlertState);
  }, [getAlertState]);

  if (dialog) {
    return (
      <Portal>
        <Dialog visible={dialog.visible} onDismiss={() => onDismiss()}>
          <Dialog.Title>알림</Dialog.Title>
          <Dialog.Content>
            <Text>{dialog.message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                if (typeof dialog.onPress === 'function') {
                  dialog.onPress();
                }
                onDismiss();
              }}
              labelStyle={{ fontSize: 17 }}
            >
              확인
            </Button>
            </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }
}

export default GlobalAlert