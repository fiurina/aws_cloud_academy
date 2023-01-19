import { environment } from '../../../../environments/environment';

export const TIMEOUT = 30000;

export class RequestEndpoints {
  static LOGIN = environment.API_URL + '/login';
  static LOGOUT = environment.API_URL + '/logout';
  static VALIDATE_TOKEN = environment.API_URL + '/validate-token';
  static INVOICES = environment.API_URL + '/invoices';
  static INVOICES_UPLOAD = environment.API_URL + '/invoices/upload';
  static INVOICE = environment.API_URL + '/invoice';
  static INVOICE_DOWNLOAD = environment.API_URL + '/invoice/download';

}
