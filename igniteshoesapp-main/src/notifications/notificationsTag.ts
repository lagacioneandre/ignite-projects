import { OneSignal } from "react-native-onesignal";

export function tagUserEmailCreate(email: string) {
    OneSignal.User.addTag('user_email', email);
}

export function tagUserEmailRemove() {
    OneSignal.User.removeTag('user_email');
}

export function tagUserInfoCreate() {
    OneSignal.User.addTags({
        user_name: 'Andre',
        user_email: 'email@mail.com',
    });
}

export function tagCartUpdate(itemsCount: string) {
    OneSignal.User.addTag('cart_items_count', itemsCount);
}
