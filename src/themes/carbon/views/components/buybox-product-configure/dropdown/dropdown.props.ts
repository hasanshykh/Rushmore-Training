/**
 * Copyright (c) 2018 Microsoft Corporation
 */
export interface IDropdownProps {
    /**
     * @friendlyName dropdownId
     * @description Id for dropdown component
     */
    dropdownId: string;

    /**
     * @friendlyName dropdownName
     * @description Name of the dropdown component
     */
    dropdownName: string;

    /**
     * @friendlyName dropdownList
     * @description List of items in dropdown
     */
    dropdownList: string[];

    /**
     * @friendlyName dropdownToggleName
     * @description Name to use for the toggle when nothing is selected
     */
    dropdownToggleName: string;

    /**
     * @friendlyName onChange
     * @description Callback that gets fired when when a selected dimension changes
     */
    onChange?(notification: IDropdownOnSelectionChangeNotification): Promise<void>;
}

export interface IDropdownOnSelectionChangeNotification {
    dropdownId: string;
    selectId: string;
    selectedValue: string;
}
