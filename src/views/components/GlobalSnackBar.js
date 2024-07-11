import React, { useEffect, useState } from 'react';
import { Snackbar } from 'react-native-paper';
import { getSnackBar, setSnackBar } from '../../store';

const GloabalSnackBar = () => {
  const getSnack = getSnackBar();
  const setSnack = setSnackBar();
  const [snackVisible, setSnackVisible] = useState(getSnack);

  const onDismiss = () => {
    setSnack({ visible: false, message: snackVisible.message });
    setSnackVisible({ visible: false, message: snackVisible.message });
  }

  useEffect(() => {
    setSnackVisible(getSnack);
  }, [getSnack]);

  if (snackVisible) {
    return (
        <Snackbar
        visible={snackVisible.visible}
        onDismiss={() => onDismiss()}
        action={{
          label: '닫기',
          onPress: () => {
            onDismiss()
          },
        }}
      >
        {snackVisible.message}
      </Snackbar>
    )
  }
}

export default GloabalSnackBar