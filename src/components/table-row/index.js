import React from 'react';
import Icon from './../../utils/icon';

class TableRow extends React.Component {

  shouldComponentUpdate = (nextProps) => {
    if (nextProps.childPropsHaveChanged) {
      return true;
    }

    if (nextProps.gutterFields) {
      return true;
    }

    return (nextProps.data !== this.props.data);
  }

  buildRow = () => {
    var row = [],
        rowID = this.props.row_id;

    if (!this.props.placeholder && !this.props.gutterFields) {
      row.push(
        <td key={ rowID + 'actions' } className="ui-table-row__td ui-table-row__td--actions">
          <button type="button" className="ui-table-row__delete" id={ rowID } onClick={this.deleteMethod}>
            <Icon type="delete" className="ui-table-row__delete-icon" />
          </button>
        </td>
      );
    } else {
      var tdClass = "ui-table-row__td ui-table-row__td--actions";

      if (this.props.gutterFields) {
        tdClass += " ui-table-row__td--gutter";
      }

      row.push(<td key={ rowID + 'actions' } className={ tdClass }></td>);
    }

    for (var key in this.props.fields) {
      var field = this.props.fields[key];

      if (this.props.gutterFields) {
        var gutterField = this.props.gutterFields[field.props.name];
        row.push(<td hidden={ field.props.hidden } key={ key + "gutter" } className="ui-table-row__td ui-table-row__td--gutter">{ gutterField }</td>);
      } else {
        var value = (this.props.data) ? this.props.data.get(field.props.name) : null;
        row.push(this.buildCell(field, value));
      }
    }

    return row;
  }

  deleteMethod = (ev) => {
    ev.preventDefault();
    this.props.deleteRowHandler(ev, this.props);
  }

  buildCell = (field, value) => {
    var rowID = this.props.row_id,
        fieldProps = {
          label: false,
          key: rowID,
          name: `[${this.props.name}_attributes][${rowID}][${field.props.name}]`,
          row_id: rowID,
          namespace: this.props.name,
          onChange: this.props.updateRowHandler
        };

    if (value) {
      fieldProps.value = value
    }

    if (this.props.placeholder) {
      fieldProps._placeholder = true;
    }

    var fieldHTML = React.cloneElement(field, fieldProps);

    return <td hidden={ field.props.hidden } key={ rowID + field.props.name } className="ui-table-row__td">{ fieldHTML }</td>;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    var mainClasses = "ui-table-row";

    if (this.props.gutterFields) {
      mainClasses += " ui-table-row--gutter";
    }

    return (
      <tr className={ mainClasses }>
        { this.buildRow() }
      </tr>
    );
  }

};

export default TableRow;