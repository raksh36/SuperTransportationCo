import { LightningElement, wire, api } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import { getRecord, getRecordNotifyChange } from 'lightning/uiRecordApi';
import VIEW_RECORD from '@salesforce/messageChannel/Pass_Id__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ViewBusDetails extends LightningElement {
    subscription = null;
    @wire(MessageContext) messageContext;
    @api recordId;
    @api objectApiName;

    subscribeToMessageChannel() {
        this.subscription = subscribe(
          this.messageContext,
          VIEW_RECORD,
          (message) => this.handleMessage(message)
        );
    }
    handleMessage(message) {
        this.recordId = message.recordId;
    }
    connectedCallback() {
        this.subscribeToMessageChannel();
    }
    handleReset(event) {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
     }
     notifyLDS(event){
        getRecordNotifyChange([{recordId: this.recordId}]);
        const evt = new ShowToastEvent({
            title: 'Success!!',
            message: 'Update successful!',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
     }


}