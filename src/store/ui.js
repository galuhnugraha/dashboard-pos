import {action, computed, observable} from 'mobx';
import {useMediaQuery} from "react-responsive";


export class UiStore {
    firstLoad = true;
    @observable mediaQuery = {};

    @action
    setMediaQuery(data) {
        console.log(data, this.mediaQuery, "mediadata");
        if (this.mediaQuery.isDesktop !== data.isDesktop || this.mediaQuery.isMobile !== data.isMobile) {
            this.mediaQuery = data;
        }
    };

}