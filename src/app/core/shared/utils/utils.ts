

export default class Utils {
    static validateZipCode(zip_code: string): boolean {
        const zipCode = zip_code?.replace(/\D/g, '');

        if (!zipCode || zipCode.length !== 8) {
            return false;
        }

        if (/^\d{2}\.\d{3}-\d{3}$/.test(zipCode)) {
            return false;
        }

        return true;
    }
}