import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization'; // Doğru içe aktarma

const getAppLanguage = async () => {
    try {
        const language = await AsyncStorage.getItem('appLanguage');
        return language || Localization.getLocales(); // Kayıtlı dil veya cihaz dili
    } catch (error) {
        console.error('AsyncStorage dan dil alınırken hata:', error);
        return Localization.getLocales();
    }
};

const setAppLanguage = async (language) => {
    try {
        await AsyncStorage.setItem('appLanguage', language);
    } catch (error) {
        console.error('AsyncStorage a dil kaydedilirken hata:', error);
    }
};

export { getAppLanguage, setAppLanguage };