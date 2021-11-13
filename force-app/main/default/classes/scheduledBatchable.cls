public with sharing class ScheduledBatchable implements Schedulable {
    public void execute(SchedulableContext sc) {
       NightlyMaintenanceCheck b = new NightlyMaintenanceCheck(); 
       Database.executeBatch(b);
    }
 }
