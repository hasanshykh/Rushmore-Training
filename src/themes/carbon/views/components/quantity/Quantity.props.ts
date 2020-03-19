/** Quantity Component Properties */
export interface IQuantityProps {
    /** The quantity min value */
    min?: number;

    /** The quantity max value */
    max: number;

    /** The quantity current value */
    currentCount?: number;

    /** sets if the quantity become button should be disabled */
    disabled?: boolean;

    /** sets icon class for decrement button */
    incrementGlyphClass?:string;

    /** sets icon class for increment button */
    decrementGlyphClass?:string;

     /** The decrement button aria-label */
    decrementButtonAriaLabel?: string;

    /** The increment button aria-label */
    incrementButtonAriaLabel?: string;

    /** The input quantity aria-label */
    inputQuantityAriaLabel?: string;

    /** The id for the component */
    id?: string;

    /** Callback that is called when the value is changed */
    onChange?(newValue: number):void;
}