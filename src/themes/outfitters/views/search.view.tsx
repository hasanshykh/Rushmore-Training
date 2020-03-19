/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ISearchCategoryViewProps, ISearchFormViewProps, ISearchKeywordViewProps, ISearchProductViewProps } from '@msdyn365-commerce-modules/search/dist/types/modules/search/components';
import { ISearchViewProps } from '@msdyn365-commerce-modules/search/dist/types/modules/search/search';
import { INodeProps, Module, Node } from '@msdyn365-commerce-modules/utilities';
import * as React from 'react';

const SearchView: React.FC<ISearchViewProps> = props => {
  const {
    Search,
    AutoSuggestAriaLabel,
    AutoSuggestAriaLabelText,
    searchText,
    AutoSuggest,
    KeywordSuggest,
    ProductSuggest,
    CategorySuggest,
    UlKeyword,
    UlProduct,
    UlCategory,
    form,
    autosuggestCategory,
    autosuggestKeyword,
    autosuggestProduct,
    SearchForm,
    FormWrapper,
    label
  } = props;

  return (
    <Module {...Search}>
      {label}
      {_renderForm(form as ISearchFormViewProps, SearchForm, FormWrapper)}
      <Node {...AutoSuggest}>
        {searchText && searchText.length > 0 ?
          <Node {...AutoSuggestAriaLabel}>{AutoSuggestAriaLabelText}</Node> : ''
        }
        {_renderKeywordSuggestions(KeywordSuggest, UlKeyword, autosuggestKeyword)}
        {_renderProductSuggestions(ProductSuggest, UlProduct, autosuggestProduct)}
        {_renderCategorySuggestions(CategorySuggest, UlCategory, autosuggestCategory)}
      </Node>
    </Module>
  );
};

const _renderForm = (form: ISearchFormViewProps, SearchForm: INodeProps, FormWrapper: INodeProps)=> {
  return (
    <Node {...SearchForm}>
      <Node {...FormWrapper}>
        {form.submitBtn}
        {form.input}
        {form.cancelBtn}
      </Node>
    </Node>
  );
};

const _renderKeywordSuggestions = (
  KeywordSuggest: INodeProps,
  UlKeyword: INodeProps,
  keywordSuggestions?: ISearchKeywordViewProps
)=> {
  return (
    keywordSuggestions && (
      <Node {...KeywordSuggest}>
        <Node {...UlKeyword}>
          {keywordSuggestions.text.map(text => {
            return text;
          })}
        </Node>
      </Node>
    )
  );
};

const _renderProductSuggestions = (
  ProductSuggest: INodeProps,
  UlProduct: INodeProps,
  productSuggestions?: ISearchProductViewProps
)=> {
  return (
    productSuggestions && (
      <Node {...ProductSuggest}>
        <Node {...UlProduct}>
          {productSuggestions.title}
          {productSuggestions.items.map((item,index)=> {
            return (
              <Node {...item.LiProduct} key={item.id || index}>
                <Node {...item.AProduct}>
                  {item.thumbnail}
                  {item.text}
                  {item.price}
                </Node>
              </Node>
            );
          })}
        </Node>
      </Node>
    )
  );
};

const _renderCategorySuggestions = (
  CategorySuggest: INodeProps,
  UlCategory: INodeProps,
  categorySuggestions?: ISearchCategoryViewProps
)=> {
  return (
    categorySuggestions && (
      <Node {...CategorySuggest}>
        <Node {...UlCategory}>
          {categorySuggestions.title}
          {categorySuggestions.text.map(text => {
            return text;
          })}
        </Node>
      </Node>
    )
  );
};

export default SearchView;