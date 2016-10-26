import React from 'react';
import classNames from 'classnames';
import Icon from './../icon';
import { Link } from 'react-router';

/**
 * A link widget.
 *
 * == How to use a Link in a component:
 *
 * In your file:
 *
 *   import Link from 'carbon/lib/components/link';
 *
 * To render the Link:
 *
 *  <Link href='foo'>Main Page</Link>
 *
 * For additional properties specific to this component, see propTypes.
 *
 * @class Link
 * @constructor
 */
class _Link extends React.Component {

  static propTypes = {

    /**
     * Gives the link a disabled state.
     *
     * @property disabled
     * @type {Boolean}
     * @default undefined
     */
    disabled: React.PropTypes.bool,

    /**
     * Renders an icon inline with the link.
     *
     * @property icon
     * @type {String}
     * @default undefined
     */
    icon: React.PropTypes.string,

    /**
     * Configures the alignment of the icon (left or right).
     *
     * @property iconAlign
     * @type {String}
     * @default left
     */
    iconAlign: React.PropTypes.string,

    /**
     * Allows the <a> tag to be set in or out of the tab order of the page
     * Boolean is used as tabindex > 0 is not really necessary, HTML order should
     * take precedence
     *
     * @property tabbable
     * @type {Boolean}
     * @default true
     */
    tabbable: React.PropTypes.bool,

    /**
     * Use `to` to use the React Router link. You can also prefix your value
     * with `to:` or `href:` to override the prop type.
     *
     * @property to
     * @type {String}
     * @default undefined
     */
    to: React.PropTypes.string,

    /**
     * Use `href` to use a generic anchor. You can also prefix your value
     * with `to:` or `href:` to override the prop type.
     *
     * @property href
     * @type {String}
     * @default undefined
     */
    href: React.PropTypes.string
  }

  static defaultProps = {
    iconAlign: 'left',
    tabbable: true
  }

  /**
   * Getter for componet properties.
   *
   * @method componentProps
   * @return {Object} props
   */
  get componentProps() {
    let { ...props } = this.props;

    props.tabIndex = this.tabIndex;

    delete props.href;
    delete props.tabbable;
    delete props.to;

    props.className = this.componentClasses;
    props[this.linkType.prop] = this.url;

    return props;
  }

  /**
   * Getter for componet classes.
   *
   * @method componentClasses
   * @return {String} class names
   */
  get componentClasses() {
    return classNames (
      'carbon-link__anchor',
      this.props.className,
      { 'carbon-link__anchor--disabled': this.props.disabled }
    );
  }

  /**
   * Returns the icon if enabled and aligned to the left.
   *
   * @method iconLeft
   * @return {Object} JSX
   */
  get iconLeft() {
    if (!this.props.icon || this.props.iconAlign !== 'left') { return null; }
    return this.icon;
  }

  /**
   * Returns the icon if enabled and aligned to the right.
   *
   * @method iconRight
   * @return {Object} JSX
   */
  get iconRight() {
    if (!this.props.icon || this.props.iconAlign !== 'right') { return null; }
    return this.icon;
  }

  /**
   * Returns the markup for the icon.
   *
   * @method icon
   * @return {Object} JSX
   */
  get icon() {
    let classes = classNames(
      "carbon-link__icon",
      `carbon-link__icon--align-${this.props.iconAlign}`
    );

    return (
      <Icon
        type={ this.props.icon }
        className={ classes }
        tooltipMessage={ this.props.tooltipMessage }
        tooltipAlign={ this.props.tooltipAlign }
        tooltipPosition={ this.props.tooltipPosition }
      />
    );
  }

  /**
   * Returns 0 or -1 for tabindex
   *
   * @method tabIndex
   * @return {String} 0 or -1
   */
  get tabIndex() {
    return this.props.tabbable && !this.props.disabled ? '0' : '-1';
  }

  /**
   * Regex for finding 'href:' or 'to:',
   *
   * @method typeRegex
   * @return {Regex}
   */
  get typeRegex() {
    return /^href:|^to:/;
  }

  /**
   * A hash of the different link types.
   *
   * @method linkTypes
   * @return {Object}
   */
  get linkTypes() {
    return {
      to: {
        prop: "to",
        component: Link
      },
      href: {
        prop: "href",
        component: "a"
      }
    };
  }

  /**
   * Returns the correct link type based on the given props.
   *
   * @method linkType
   * @return {Object}
   */
  get linkType() {
    let url = this.props.href || this.props.to,
        type = "href";

    if (url) {
      let match = url.match(this.typeRegex);

      if (match) {
        type = match[0].substr(0, match[0].length - 1);
      } else if (this.props.href) {
        type = "href";
      } else {
        type = "to";
      }
    }

    return this.linkTypes[type];
  }

  /**
   * Returns the parsed URL for the link.
   *
   * @method url
   * @return {String}
   */
  get url() {
    let url = this.props.href || this.props.to;
    if (!url) { return null; }

    return url.replace(this.typeRegex, "");
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      React.createElement(this.linkType.component, this.componentProps, (
        <span>
          { this.iconLeft }

          <span className="carbon-link__content">
            { this.props.children }
          </span>

          { this.iconRight }
        </span>
      ))
    );
  }

}

export default _Link;
