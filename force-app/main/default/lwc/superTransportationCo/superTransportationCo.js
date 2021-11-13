import { LightningElement, wire } from 'lwc';
import getBusList from '@salesforce/apex/ListBuses.getBusList';
import { publish, MessageContext } from 'lightning/messageService';
import PASS_RECORDID from '@salesforce/messageChannel/Pass_Id__c';

export default class busFleet extends LightningElement {
    @wire(MessageContext) messageContext;
    @wire(getBusList)  BusList;
    @wire(getBusList) BusListData({ error, data }) {
        if (data) {
            this.BusList = data;
            this.error = undefined;
            //console.log('Data is',JSON.stringify(data));
        } else if (error) {
            this.error = error;
            this.BusList = undefined;
            //console.log('Error is',JSON.stringify(error));
        }
    };
    showRecord(event) {
        const payload = { 
            recordId: event.target.name
        };
        publish(this.messageContext, PASS_RECORDID, payload);
    }
}