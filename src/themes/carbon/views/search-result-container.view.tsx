import { ISearchResultModalViewProps } from '@msdyn365-commerce-modules/search-result-container/dist/types/modules/search-result-container/components';
import { ICategoryHierarchyViewProps, IRefineMenuViewProps, ISearchResultContainerViewProps, ISortByViewProps, ITitleViewProps } from '@msdyn365-commerce-modules/search-result-container/dist/types/modules/search-result-container/search-result-container';
import { Module, Node } from '@msdyn365-commerce-modules/utilities';
import * as React from 'react';

const SearchResultContainerView: React.FC<ISearchResultContainerViewProps> = props => {
    const {
        SearchResultContainer, products, pagination, ProductsContainer,
        ProductSectionContainer, choiceSummary, isMobile, modalToggle,
        searchResultModal, TitleViewProps, refineMenu, categoryHierarchy,
        sortByOptions, CategoryNavContainer, RefineAndProductSectionContainer, errorMessage
    } = props;
    if (isMobile) {
        return (
        <Module {...SearchResultContainer}>
            {renderCategoryHierarchy(categoryHierarchy)}
            {renderTitle(TitleViewProps)}
            {choiceSummary}
            {modalToggle}
            {createSearchResultModal(searchResultModal, refineMenu, sortByOptions)}
            <Node {...ProductsContainer}>
                {errorMessage}
                {products}
            </Node>
            {pagination}
        </Module>
        );
    }
    return (
        <Module {...SearchResultContainer}>
        {categoryHierarchy && renderCategoryHierarchy(categoryHierarchy)}
        {TitleViewProps && renderTitle(TitleViewProps)}
        <Node {...RefineAndProductSectionContainer}>
        {/* {refineMenu && renderRefiner(refineMenu)} */}
        {createSearchResultModal(searchResultModal, refineMenu, sortByOptions)}
        <Node {...ProductSectionContainer}>
            <div className='row search-result-row'>
                <div className='col-md-12'>{choiceSummary}</div>
                <div className='col-md-4'>
                    <div className='filters-refine'><i className='filter-icon'/>{modalToggle}</div>
                </div>
                <div className='col-md-4'>
                    <Node {...CategoryNavContainer}>
                        {TitleViewProps && renderTitleCount(TitleViewProps)}
                    </Node>
                </div>
                <div className='col-md-4'>
                    {sortByOptions && renderSort(sortByOptions)}
                </div>
            </div>
            <Node {...ProductsContainer}>
               {errorMessage}
                {products}
            </Node>
            {pagination}
        </Node>
        </Node>
    </Module>
    );

};

const createSearchResultModal = (modalProps: ISearchResultModalViewProps, refineMenu: IRefineMenuViewProps, sortByDropDown: ISortByViewProps): JSX.Element => {
    return React.cloneElement(modalProps.modal, {}, modalProps.modalHeader, createModalBody(modalProps, refineMenu, sortByDropDown), modalProps.modalFooter);
};

const createModalBody = (props: ISearchResultModalViewProps, refineMenu: IRefineMenuViewProps, sortByDropDown: ISortByViewProps): JSX.Element | null => {
    if (sortByDropDown) {
        return React.cloneElement(props.modalBody, {}, renderSort(sortByDropDown), renderRefiner(refineMenu));
    }
    return null;
};

const renderRefiner = (props: IRefineMenuViewProps): JSX.Element | null => {
    const { refiners, RefineMenuContainer, RefinerSectionContainer } = props;
    if (refiners) {
        return (
            <Node {...RefinerSectionContainer}>
                <Node {...RefineMenuContainer}>
                    {refiners.map((submenu, index) => (
                        <React.Fragment key={index}>
                            {submenu}
                        </React.Fragment>
                    ))}
                </Node>
            </Node>
        );
    }
    return null;
};

const renderSort = (props: ISortByViewProps): JSX.Element | null => {
    const { SortingContainer, sortByDropDown } = props;
    if (sortByDropDown) {
        return (
            <Node {...SortingContainer}>
                {sortByDropDown}
            </Node>
        );
    }
    return null;
};

const renderCategoryHierarchy = (props: ICategoryHierarchyViewProps): JSX.Element | null => {
    const { CategoryHierarchyContainer, categoryHierarchyList, categoryHierarchySeparator } = props;
    if (categoryHierarchyList) {
        return (
            <Node {...CategoryHierarchyContainer}>
                {categoryHierarchyList.map((category, index) => (
                    <React.Fragment key={index}>
                        {category}
                        {categoryHierarchyList && categoryHierarchyList[index + 1] && categoryHierarchySeparator}
                    </React.Fragment>
                ))}
            </Node>
        );
    }

    return null;
};

const renderTitle = (props: ITitleViewProps): JSX.Element | null => {
    const { title, TitleContainer } = props;
    if (title) {
        return (
            <Node {...TitleContainer}>
                <h2>
                    {/* {title.titlePrefix} */}
                    {title.titleText}
                </h2>
            </Node>
        );
    }
    return null;
};

const renderTitleCount = (props: ITitleViewProps): JSX.Element | null => {
    const { title, TitleContainer } = props;
    if (title) {
        return (
            <Node {...TitleContainer}>
                <h5>
                    {title.titleCount}
                </h5>
            </Node>
        );
    }
    return null;
};

export default SearchResultContainerView;