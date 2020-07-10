import AsyncStorage from '@react-native-community/async-storage';

const STORAGE_KEYS = {
    LIST_METADATA: "@LIST_METADATA",
    LIST: "@LIST",
};

const _getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
    } catch(e) {}
    return null;
}

function _makeModel (key: string) {
    return {
        get: async function () {
            return await _getData(key);
        },
        set: async function (value: any) {
            try {
                const jsonValue = JSON.stringify(value);
                await AsyncStorage.setItem(key, jsonValue);
              } catch (e) {
                // saving error
                console.log(e);
              }
        },
    };
}

export const metadata = _makeModel(STORAGE_KEYS.LIST_METADATA);
export const list = _makeModel(STORAGE_KEYS.LIST);