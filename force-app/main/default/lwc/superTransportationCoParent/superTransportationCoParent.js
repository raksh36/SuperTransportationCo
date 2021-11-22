import { LightningElement,track } from 'lwc';
import getBusList from '@salesforce/apex/ListBuses.getBusList';
import getBusSingle from '@salesforce/apex/ListBuses.getSingleBus';
import { refreshApex } from '@salesforce/apex';

export default class SuperTransportationCoParent extends LightningElement {
    passBusId;
    @track BusList;

    connectedCallback(){
        getBusList()
            .then(result => {
                this.BusList = result;
            })
            .catch(error => {
                console.error(error);
            });
    }

    showRecord(event) {
        this.passBusId = event.target.name;
    }


    refreshBusIdTile(event) {
        let busLS = [...this.BusList];
        getBusSingle({recordId: event.detail})
        .then(result => {
            busLS = busLS.map((element, index) => {
                if(element.Id === result.Id) {
                    busLS[index] = {...result};
                }
                return busLS[index];
            });
            this.BusList = [...busLS];
            refreshApex(this.BusList);
        })
        .catch(error => {
            console.error(error);
        });
    }
}