public class SAIDSearchHandler {
    @AuraEnabled
    public static void insertSAIDRecord(List<SAID__c> saidList) {
        // Perform operations on the array of SAID__c records
        for (SAID__c saidRecord : saidList) {
            // Example: Access fields of the SAID__c record
            String year = saidRecord.Year__c;
            String month = saidRecord.Month__c;
            String day = saidRecord.Day__c;
            String gender = saidRecord.Gender__c;
            String citizenship = saidRecord.Citizenship__c;
            
            // Example: Perform additional logic on the record
            // ...
            
            // Example: Save the modified record
            upsert saidRecord;
        // Perform any additional validations or data manipulation here
        

    }
}
}