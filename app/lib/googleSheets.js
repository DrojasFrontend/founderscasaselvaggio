import { google } from 'googleapis';

// Configuración de las credenciales
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// ID de la hoja de cálculo (esto lo obtendrás de la URL de tu Google Sheet)
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

export const appendToSheet = async (values) => {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:K', // Ajusta según tus columnas
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [values],
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al escribir en Google Sheets:', error);
    throw error;
  }
}; 