import crypto from 'crypto';

/**
 * Verifies the Telegram Web App data.
 * @param telegramWebAppData The encoded data sent from Telegram.
 * @param secret The secret token provided by Telegram for verification.
 * @returns The parsed data if verification is successful, otherwise null.
 */
export function verifyTelegramWebAppData(telegramWebAppData: string, secret: string): any | null {
  const [data, hash] = telegramWebAppData.split('|');
  
  // Decode the data
  const decodedData = Buffer.from(data, 'base64').toString('utf-8');
  
  // Create a hash of the decoded data using the secret
  const expectedHash = crypto.createHmac('sha256', secret).update(data).digest('base64');

  // Compare the computed hash with the received hash
  if (expectedHash === hash) {
    try {
      return JSON.parse(decodedData);
    } catch (error) {
      console.error('Error parsing Telegram Web App data:', error);
      return null;
    }
  } else {
    console.error('Invalid hash. Data verification failed.');
    return null;
  }
}
