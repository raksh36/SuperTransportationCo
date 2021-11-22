import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ViewBusDetailsChild extends LightningElement {
    @api getBusId;


    passToParent() {
        this.dispatchEvent( new CustomEvent( 'pass', {
            detail: this.getBusId
        } ) );
    }

    notifyLDS(){
        const evt = new ShowToastEvent({
            title: 'Success!!',
            message: 'Update successful!',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
        this.passToParent();
    }
}