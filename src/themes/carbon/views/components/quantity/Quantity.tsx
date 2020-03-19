import { debounce } from 'lodash';
import * as React from 'react';
import { IQuantityProps } from './Quantity.props';

interface IQuantityState {
    currentInput: number;
}
/**
 * Quantity Component - This component is used to add or remove quantity
 */

export default class Quantity extends React.PureComponent<IQuantityProps, IQuantityState> {
    public static defaultProps: Partial<IQuantityProps> = {
        min: 1,
        decrementGlyphClass: 'fas fa-minus',
        incrementGlyphClass: 'fas fa-plus'
    };

    private inputRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

    constructor(props: IQuantityProps) {
        super(props);
        this.state = { currentInput: props.currentCount || 1 };
        this._onIncrement = this._onIncrement.bind(this);
        this._onDecrement = this._onDecrement.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }

    public render(): JSX.Element {
        const glyphMinusClassName: string = `${this.props.decrementGlyphClass!} quantity__controls-glyph`;
        const glyphPlusClassName: string = `${this.props.incrementGlyphClass!} quantity__controls-glyph`;
        const disabled = this.state.currentInput === this.props.min;
        const incDisabled = this.state.currentInput === this.props.max;
        const currentValue = this.state.currentInput;

        return (
            <>
                <div className='quantity' id={this.props.id}>
                    <button
                        disabled={disabled}
                        title= {disabled ? '' : this.props.decrementButtonAriaLabel}
                        className={`decrement quantity__controls ${disabled ? 'disabled' : ''}`}
                        onClick={this._onDecrement}
                        aria-hidden={true}
                        tabIndex={-1}
                        color={'secondary'}
                    >
                        <span className={glyphMinusClassName} />
                    </button>
                    <input
                        type='number'
                        className='quantity-input'
                        pattern='[0-9]*'
                        value={this.state.currentInput}
                        onChange={this._handleChange}
                        onBlur={this._validateMin}
                        aria-live='polite'
                        aria-label={`${this.props.inputQuantityAriaLabel}`}
                        role='spinbutton'
                        aria-valuemin={this.props.min}
                        aria-valuemax={this.props.max}
                        aria-valuenow={currentValue}
                        ref={this.inputRef}
                    />
                    <button
                        disabled={incDisabled}
                        title={incDisabled ? '' : this.props.incrementButtonAriaLabel}
                        className={`increment quantity__controls ${incDisabled ? 'disabled' : ''}`}
                        onClick={this._onIncrement}
                        aria-hidden={true}
                        tabIndex={-1}
                        color={'secondary'}
                    >
                        <span className={glyphPlusClassName} />
                    </button>
                </div>
            </>
        );
    }

    private _onIncrement(): void {
        let invokeCallback = false;
        this.setState((prevState: IQuantityState) => {
            if (prevState.currentInput < this.props.max) {
                invokeCallback = true;
                return { currentInput: prevState.currentInput + 1 };
            } else {
                invokeCallback = false;
                return { currentInput: this.props.max };
            }
            // tslint:disable-next-line:align
        }, () => {
            invokeCallback && this.props.onChange && this.props.onChange(this.state.currentInput);
        });
    }

    private _onDecrement(): void {
        let invokeCallback = false;
        this.setState((prevState: IQuantityState) => {
            if (prevState.currentInput > 1) {
                invokeCallback = true;
                return { currentInput: prevState.currentInput - 1 };
            } else {
                invokeCallback = false;
                return { currentInput: 1 };
            }
            // tslint:disable-next-line:align
        }, () => { invokeCallback && this.props.onChange && this.props.onChange(this.state.currentInput); });
    }

    private _handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const currentValue = parseInt((e.target.value), 10);
        const minValue = this.props.min === undefined ? 1 : this.props.min;
        const inputElement = this.inputRef && this.inputRef.current && this.inputRef.current instanceof HTMLInputElement && this.inputRef.current;

        if (currentValue > this.props.max) {
            this.setState({ currentInput: this.props.max },
                          () => {
                    debounce(() => {
                        this.props.onChange && this.props.onChange(this.state.currentInput);
                    },       200)();});
        } else {
                this.setState({ currentInput: currentValue },
                              () => {
                                  debounce(() => {
                                    if(!isNaN(this.state.currentInput) && !(this.state.currentInput < minValue)) {
                                        this.props.onChange && this.props.onChange(this.state.currentInput);

                                        if (inputElement) {
                                            inputElement.setAttribute('aria-valuenow', currentValue.toString());
                                            inputElement.setAttribute('value', currentValue.toString());
                                        }
                                    }
                                  },       200)();});
        }
    }

    private _validateMin = (): void => {
        const minValue = this.props.min === undefined ? 1 : this.props.min;
        if(isNaN(this.state.currentInput) || (this.state.currentInput < minValue)) {
            this.setState({ currentInput: minValue }, () => { this.props.onChange && this.props.onChange(this.state.currentInput); });
        } else {
            this.props.onChange && this.props.onChange(this.state.currentInput);
        }
    }
}