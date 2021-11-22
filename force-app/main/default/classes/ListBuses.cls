public with sharing class ListBuses {
    @AuraEnabled //(cacheable=true)
    public static List<Bus__c> getBusList() {
        return [SELECT Id, Name, Year__c, Maximum_Capacity__c, Odometer_Reading__c,Bus_Image__c FROM Bus__c ];
    }
    @AuraEnabled //(cacheable=true)
    public static Bus__c getSingleBus(String recordId){
        return [SELECT Id, Name, Year__c, Maximum_Capacity__c, Odometer_Reading__c,Bus_Image__c FROM Bus__c where Id = :recordId];
    }
}
