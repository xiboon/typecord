import { ComponentType, ModalSubmitComponent } from 'discord-api-types/v10';

export class ModalComponent {
    type: ComponentType;
    value: string;
    customId: string;
    constructor(data: ModalSubmitComponent) {
        this.type = data.type;
        this.customId = data.custom_id;
        this.value = data.value;
    }
}
