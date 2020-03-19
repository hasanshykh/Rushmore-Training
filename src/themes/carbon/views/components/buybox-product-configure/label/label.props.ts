/**
 * Copyright (c) 2018 Microsoft Corporation
 */
export interface ILabelProps {
    /**
     * @friendlyName labelId
     * @description Id for label component
     */
    labelId: string;

    /**
     * @friendlyName labelName
     * @description Name of the label component
     */
    labelName: string;

    /**
     * @friendlyName labelList
     * @description List of items in label
     */
    labelList: string[];

    /**
     * @friendlyName labelToggleName
     * @description Name to use for the toggle when nothing is selected
     */
    labelToggleName: string;

    /**
     * @friendlyName onChange
     * @description Callback that gets fired when when a selected dimension changes
     */
    onChange?(notification: ILabelOnSelectionChangeNotification): Promise<void>;
}

export interface ILabelOnSelectionChangeNotification {
    labelId: string;
    selectId: string;
    selectedValue: string;
}
