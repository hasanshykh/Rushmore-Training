/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';

import { IKhaadiLandingData } from './khaadi-landing.data';
import { IKhaadiLandingProps } from './khaadi-landing.props.autogenerated';


const _renderImage = (productImageUrl: string): JSX.Element => {
    return <img src={productImageUrl} alt="background image" className='img-fluid p-3' />;
};

const _renderRegion = (btnText: string): JSX.Element => {
    return (
        <div className='container'>
            <div className="col-md-12">
                <select style={dropdownStyle} className="col-md-12">
                    <option>Select your country</option>
                    <option>Pakitan</option>
                    <option>UAE</option>
                    <option>India</option>
                </select>
            </div>
            <button style={buttonCss} type='button' className='btn btn-primary col-md-8'>{btnText}</button>
        </div>
    )
};

/**
 *
 * KhaadiLanding component
 * @extends {React.PureComponent<IKhaadiLandingProps<IKhaadiLandingData>>}
 */
export default class KhaadiLanding extends React.PureComponent<IKhaadiLandingProps<IKhaadiLandingData>> {

    public render(): JSX.Element {
        const { config, resources } = this.props;

        const imageUrl = config.imageUrl ? config.imageUrl : '';
        const imabtnTextgeUrl = config.btnText ? config.btnText : '';
        
        const bgImage = _renderImage(imageUrl);
        const regionContainer = _renderRegion(imabtnTextgeUrl);

        return (
            <div className='row'>
                {bgImage}
                <div style={regionMainContainer} className="col-md-3">
                    {regionContainer}
                </div>
            </div>
        );
    }
}



const regionMainContainer: React.CSSProperties = {
    position: 'absolute',
    height: '250px',
    marginTop: '270px',
    marginLeft: '900px',
    padding: '0px',
    textAlign: 'center'
}

const buttonCss: React.CSSProperties = {
    border: '1px solid black',
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    height: '40px',
    marginTop: '30px',
    outlineColor: 'transparent'
}

const dropdownStyle: React.CSSProperties = {
    height: '50px',
    border: '1px solid black',
    borderRadius: '10px'
}