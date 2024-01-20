import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ns1 from "./translations/en.json";
import ns2 from "./translations/de.json";
import ns3 from "./translations/ev.json";

export const resources = {
    en: {
        main: ns1
    },
    de: {
        main: ns2
    },
    ev: {
        main: ns3
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en"
});

export default i18n;
