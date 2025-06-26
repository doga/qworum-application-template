import { Language } from "../deps.mjs";

/**
 * The set of languages that are available for a given Qworum API version.
 */
class Languages {
  /** @type {Language[]} */
  languages;

  /**
   * @param {Language[]} languages
   */
  constructor(languages){
    this.languages = languages;
  }

  /**
   * @param {(string | undefined)} pathOfLanguagesFile
   * @returns {Languages}
   */
  static async read(pathOfLanguagesFile){
    const path = pathOfLanguagesFile ?? 'languages.json';
    let langs = [Language.fromCode('en')];
    try {
      const response = await fetch(path);
      langs = (await response.json()).map(l => Language.fromCode(l));
    } catch (error) {}
    return new Languages(langs);
  }  

  /**
   * Returns the API language that is the most suitable for the end-user.
   * @returns {Language}
   */
  getUserLang(){
    try {
      var lang = null;
      if (window.navigator.language) {
        const browserLang = window.navigator.language.split('-')[0];
        for (let j = 1; j < this.languages.length; j++) {
          const siteLang = this.languages[j].iso639_1;
          if (siteLang === browserLang) {
            lang = siteLang;
            break;
          }
        }
      } else if (window.navigator.languages) {
        for (let i = 0; i < window.navigator.languages.length; i++) {
          const browserLang = window.navigator.languages[i].split('-')[0];
          for (let j = 1; j < this.languages.length; j++) {
            const siteLang = this.languages[j].iso639_1;
            if (siteLang === browserLang) {
              lang = siteLang;
              break;
            }
          }
          if (lang) break;
        }
      } else if (window.navigator.userLanguage) {
        const browserLang = window.navigator.userLanguage.split('-')[0];
        for (let j = 1; j < this.languages.length; j++) {
          const siteLang = this.languages[j].iso639_1;
          if (siteLang === browserLang) {
            lang = siteLang;
            break;
          }
        }
      } else if (window.navigator.browserLanguage) {
        const browserLang = window.navigator.browserLanguage.split('-')[0];
        for (let j = 1; j < this.languages.length; j++) {
          const siteLang = this.languages[j].iso639_1;
          if (siteLang === browserLang) {
            lang = siteLang;
            break;
          }
        }
      } else if (window.navigator.systemLanguage) {
        const browserLang = window.navigator.systemLanguage.split('-')[0];
        for (let j = 1; j < this.languages.length; j++) {
          const siteLang = this.languages[j].iso639_1;
          if (siteLang === browserLang) {
            lang = siteLang;
            break;
          }
        }
      }
      if (!lang) lang = this.languages[0].iso639_1;

      return Language.fromCode(lang);
    } catch (error) {
      return Language.fromCode('en');
    }
  }

}

export default Languages;
export { Languages };
