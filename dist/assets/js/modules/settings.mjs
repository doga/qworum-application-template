class Settings {
  static async read(){
    try {
      const
      response = await fetch('/settings.json'),
      text     = await response.text(),
      settings = JSON.parse(text);

      return settings;
    } catch (error) {
      return {};
    }
  }  
}

export { Settings };
