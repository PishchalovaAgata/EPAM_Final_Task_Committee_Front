import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Header } from 'semantic-ui-react';

const DropDownComponent = ({
    input, label, items, defaultItems,
}) => (
    <div className="filter-item">
        <Header as="h3">
            {label}
        </Header>
        <Dropdown
            placeholder="Any"
            fluid
            search
            selection
            multiple
            options={items}
            onChange={(event, obj) => input.onChange(obj.value)}
            value={defaultItems || []}
        />
    </div>
);

export default DropDownComponent;

DropDownComponent.defaultProps = {
    label: '',
    items: [],
};

DropDownComponent.propTypes = {
    input: PropTypes.shape({}),
    label: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({})),
    defaultItems: PropTypes.arrayOf(PropTypes.number),
};
