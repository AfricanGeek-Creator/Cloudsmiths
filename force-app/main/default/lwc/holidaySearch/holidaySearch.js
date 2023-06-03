import { LightningElement, track } from 'lwc';

export default class HolidaySearch extends LightningElement {
    @track idNumber;
    @track holidays;
    @track isInvalidIdNumber = false;
    @track isSearchDisabled = true;

    handleIdNumberChange(event) {
        this.idNumber = event.target.value;
        this.isInvalidIdNumber = false;
        this.validateIdNumber();
    }

    validateIdNumber() {
        const idNumberInput = this.template.querySelector('lightning-input');
        if (idNumberInput.checkValidity()) {
            this.isSearchDisabled = false;
        } else {
            this.isSearchDisabled = true;
        }
    }

    searchHolidays() {
        if (this.template.querySelector('lightning-input').checkValidity()) {
            const decodedInfo = this.decodeIdNumber(this.idNumber);
            if (decodedInfo) {
                const { year, month, day, gender, citizenship } = decodedInfo;
                const personDetails = this.getPersonDetails(year, month, day, gender, citizenship);

                // Use the personDetails object to retrieve relevant parts of the ID number

                // Example code for updating the holidays array
                this.holidays = ['Holiday 1', 'Holiday 2', 'Holiday 3']; // Replace with the actual response data
            } else {
                // Invalid ID number
                this.isInvalidIdNumber = true;
            }
        } else {
            // ID number is invalid
            this.isInvalidIdNumber = true;
        }
    }

    decodeIdNumber(idNumber) {
        if (idNumber.length !== 13) {
            return null; // Invalid ID number length
        }

        const birthDatePart = idNumber.substring(0, 6);
        const genderPart = idNumber.substring(6, 10);
        const citizenshipPart = idNumber.substring(10, 11);
        const checksumPart = idNumber.substring(12, 13);

        // Decode birth date
        const year = birthDatePart.substring(0, 2);
        const month = birthDatePart.substring(2, 4);
        const day = birthDatePart.substring(4, 6);

        // Decode gender
        const gender = parseInt(genderPart) < 5000 ? 'Female' : 'Male';

        // Decode citizenship
        const citizenship = parseInt(citizenshipPart) === 0 ? 'SA Citizen' : 'Permanent Resident';

        // Verify checksum
        const calculatedChecksum = this.calculateChecksum(idNumber.substring(0, 12));
        const checksum = parseInt(checksumPart);
        if (calculatedChecksum !== checksum) {
            return null; // Invalid checksum
        }

        return {
            year,
            month,
            day,
            gender,
            citizenship
        };
    }

    calculateChecksum(idNumber) {
        const weights = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
        let sum = 0;
        for (let i = 0; i < weights.length; i++) {
            let digit = parseInt(idNumber.charAt(i)) * weights[i];
            if (digit > 9) {
                digit = digit.toString().split('').map(Number).reduce((a, b) => a + b);
            }
            sum += digit;
        }
        return (10 - (sum % 10)) % 10;
    }

        getPersonDetails(year, month, day, gender, citizenship) {
        let birthYear;
      
        const currentYear = new Date().getFullYear() % 100; // Get the last two digits of the current year
      
        if (parseInt(year) <= currentYear) {
          birthYear = 2000 + parseInt(year);
        } else {
          birthYear = 1900 + parseInt(year);
        }
      
        return {
          birthDate: new Date(`${birthYear}-${month}-${day}`),
          gender,
          citizenship
        };
      }
      //user story
    }