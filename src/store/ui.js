import {action,observable} from 'mobx';


export class UiStore {
    firstLoad = true;
    @observable mediaQuery = {};

    @action
    setMediaQuery(data) {
        if (this.mediaQuery.isDesktop !== data.isDesktop || this.mediaQuery.isMobile !== data.isMobile) {
            this.mediaQuery = data;
        }
    };

}