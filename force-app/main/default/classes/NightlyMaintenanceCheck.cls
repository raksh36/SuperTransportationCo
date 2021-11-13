public with sharing class NightlyMaintenanceCheck implements Database.Batchable<SObject> {
    public Database.QueryLocator start(Database.BatchableContext ctx){
        return Database.getQueryLocator([SELECT Id,Name,Last_Ping_Location__c FROM Bus__c WHERE Maximum_Capacity__c = '60' AND Maintenace_Visit__c = 0]);
    }
    public void execute(Database.BatchableContext ctx, List<Bus__c> records){
        List<Maintenance__c> maintenanceVisitCreate = new List<Maintenance__c>();
        List<Garage__c> locationGarage = [SELECT Id, Location__c FROM Garage__c];
        for(Bus__c bus:records){
            Location locBus = bus.Last_Ping_Location__c;
            Double minDistance = 0;
            Id garageAssign = null;
            for(Garage__c garage:locationGarage){
                Location locGarage = garage.Location__c;
                if(minDistance == 0){
                    minDistance = locBus.getDistance(locGarage, 'mi');
                }
                else if(minDistance > 0 && locBus.getDistance(locGarage, 'mi') < minDistance){
                    minDistance = locBus.getDistance(locGarage, 'mi');
                    garageAssign = garage.Id;
                }                
            }
            Maintenance__c mvs = new Maintenance__c();
            mvs.Bus__c = bus.Id;
            mvs.Garage__c = garageAssign;
            //mvs.Schedule_Time__c = datetime.now();
            mvs.Name = 'Maintenance required for '+bus.Name+' on '+ Datetime.now().format('yyyy-MM-dd');
            maintenanceVisitCreate.add(mvs);
        }
        Database.insert(maintenanceVisitCreate, false);
    }

    public void finish(Database.BatchableContext ctx){

    }
}
