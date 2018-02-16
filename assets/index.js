import Expo from 'expo';

function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Expo.Asset.fromModule(image).downloadAsync();
        }
    });
}
function cacheFonts(fonts) {
    return Expo.Font.loadAsync(fonts);
}

const fonts = {
    'open-sans-light': require('./fonts/OpenSans-Light.ttf'),
    'open-sans-light-italic': require('./fonts/OpenSans-LightItalic.ttf'),
    'open-sans': require('./fonts/OpenSans-Regular.ttf'),
    'open-sans-italic': require('./fonts/OpenSans-Italic.ttf'),
    'open-sans-semibold': require('./fonts/OpenSans-SemiBold.ttf'),
    'open-sans-semibold-italic': require('./fonts/OpenSans-SemiBoldItalic.ttf'),
    'open-sans-bold': require('./fonts/OpenSans-SemiBold.ttf'),
    'open-sans-bold-italic': require('./fonts/OpenSans-SemiBoldItalic.ttf'),
    'open-sans-extrabold': require('./fonts/OpenSans-ExtraBold.ttf'),
    'open-sans-extrabold-italic': require('./fonts/OpenSans-ExtraBoldItalic.ttf'),
    'Material Icons': require('./fonts/MaterialIcons.ttf')
}

const images = []

export const initializeAssets = Promise.all([
    cacheImages(images),
    cacheFonts(fonts),
]);