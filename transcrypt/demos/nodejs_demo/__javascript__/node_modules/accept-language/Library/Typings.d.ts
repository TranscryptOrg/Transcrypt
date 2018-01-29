
declare module 'accept-language' {

    interface AcceptLanguage {

        /**
         * Define your supported languages. The first language will be your default language.
         */
        languages(languages: string[]): void;

        /**
         * Get matched language. If no match, the default language will be returned.
         */
        get(priorityList: string | null | undefined): string | null;
    }

    interface AcceptLanguageModule extends AcceptLanguage {

        /**
         * Create instance of parser
         */
        create(): AcceptLanguage;
    }

    const __$export: AcceptLanguageModule & { default: AcceptLanguageModule };
    export = __$export;
}
