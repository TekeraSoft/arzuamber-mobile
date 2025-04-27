import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { ToastConfig } from 'react-native-toast-message/lib/src/types';

export const toastConfig: ToastConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#10b981', backgroundColor: '#ecfdf5' }}
            contentContainerStyle={{ paddingHorizontal: 30 }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#065f46',
            }}
            text2Style={{
                fontSize: 14,
                color: '#065f46',
            }}
        />
    ),

    error: (props) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: 'red', backgroundColor: '#fef2f2', marginTop:15 }}
            contentContainerStyle={{ paddingHorizontal: 30 }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#991b1b',
            }}
            text2Style={{
                fontSize: 14,
                color: '#991b1b',
            }}
        />
    ),
};