import type { I18nConfig } from "next-i18next/proxy";

const localeResourceLoaders = {
  id: {
    blog: () => import("./src/i18n/locales/id/blog.json"),
  },
  en: {
    blog: () => import("./src/i18n/locales/en/blog.json"),
  },
  jv: {
    blog: () => import("./src/i18n/locales/jv/blog.json"),
  },
} as const;

const i18nConfig: I18nConfig = {
  supportedLngs: ["id", "en", "jv"],
  fallbackLng: "id",
  defaultNS: "blog",
  ns: ["blog"],
  localeInPath: true,
  resourceLoader: async (language, namespace) => {
    const languageResources =
      localeResourceLoaders[language as keyof typeof localeResourceLoaders];
    const loader =
      languageResources?.[
        namespace as keyof (typeof localeResourceLoaders)[keyof typeof localeResourceLoaders]
      ];

    if (!loader) {
      throw new Error(
        `Missing translation resource for language '${language}' and namespace '${namespace}'.`,
      );
    }

    return loader();
  },
};

export default i18nConfig;
