export default class OnesignalApi {
  baseUrl = 'https://onesignal.com/api/v1';
  authKey = '';

  constructor(authKey) {
    this.authKey = authKey;
  }

  async getApps() {
    return await fetch(`${this.baseUrl}/apps`, {
      headers: {
        Authorization: `Basic ${this.authKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  async getCsvExport(apiKey: string, app_id: string, fields: string[]) {
    return await fetch(`${this.baseUrl}/players/csv_export?app_id=${app_id}`, {
      headers: {
        Authorization: `Basic ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        extra_fields: fields,
      }),
    });
  }
}
