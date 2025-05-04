import React from 'react';
import { Modal, View, ActivityIndicator, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const ThreeDSModal = ({ visible, htmlContent, onClose, onSuccess, onFailure }) => {
    const htmlWithWrapper = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>3D Secure</title>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
  `;

    const jsToInject = `
    setTimeout(function() {
      var form = document.getElementById('iyzico-3ds-form');
      if (form) {
        form.submit();
      }
    }, 100);
    true;
  `;

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <View style={{ flex: 1, marginTop:20 }}>
                <WebView
                    originWhitelist={['*']}
                    source={{ html: htmlWithWrapper }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    mixedContentMode="always"
                    injectedJavaScript={jsToInject}
                    onNavigationStateChange={(navState) => {
                        const { url } = navState;
                        if (url.includes('/payment-success')) {
                            onSuccess();
                            onClose();
                        } else if (url.includes('/payment-failure')) {
                            onFailure();
                            onClose();
                        }
                    }}
                    startInLoadingState={true}
                    renderLoading={() => (
                        <View style={styles.loading}>
                            <ActivityIndicator size="large" />
                        </View>
                    )}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    closeButton: {
        padding: 20,
        position: 'absolute',
        top: 30,
        right: 20,
        zIndex: 1,
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    closeText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ThreeDSModal;