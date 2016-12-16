import { NativeModules } from 'react-native';

const CookieManager = NativeModules.RNCookieManager;

export default {
    get(url:String, name?: String): Promise<Object|String> {
        return CookieManager.getCookie(url).then((cookie: Object): Object => {
            if (name && cookie) {
                return cookie[name] || null;
            } else {
                return cookie ? cookie : null;
            }
        });
    },

    set(url:String, name: String, value: any, options?: Object): Promise {
        const opts = Object.assign(options);
        if (opts.expires && opts.expires instanceof Date) {
            opts.expires = opts.expires.getTime();
        }
        return CookieManager.setCookie(url, name, value, opts);
    },

    clear(url?: String): Promise {
        return url ? CookieManager.clearCookieFromURL(url) : CookieManager.clearCookies();
    }
};
