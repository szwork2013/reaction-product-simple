
Variant = class SimpleVariant extends React.Component {

  /**
   * onEditClick
   * @param  {Event} event Event object
   * @return {void}
   */
  onClickEdit = (event) => {
    event.stopPropagation();

    if (this.props.onClickEdit) {
      this.props.onClickEdit(this.props.variant);
    }

    // TODO: Maybe move this to the parent component?
    ReactionCore.showActionView({
      label: "Edit Product",
      template: "productDetailSettings",
      type: "product",
      data: {
        product: this.props.variant
      }
    });
  }

  /**
   * Render the item inventory status badge
   * @return {JSX} badge template
   */
  renderBadge() {
    const inventory = this.props.inventoryManagement;

    if (inventory) {
      if (inventory.isSoldOut) {
        return <span className="variant-qty badge">{inventory.inventoryQuantity}</span>;
      } else if (inventory.inventoryPolicy) {
        return <span class="variant-qty-sold-out badge">Sold Out!</span>;
      }

      return <span class="variant-qty-sold-out badge">Backorder</span>;
    }
  }

  /**
   * Render Component
   * @return {JSX} component template
   */
  render() {
    return (
      <div className="simple-variant {selectedVariant}">
        <div className="media">
          <img src="/resources/placeholder.gif" />
        </div>
        <div className="detail">
          <div className="detail-title">{this.props.variant.title}</div>
          <div className="detail-price">{this.props.variant.displayPrice}</div>
          <div className="detail-stock">
            {this.renderBadge()}
            <button className="edit hidden-xs" onClick={this.onClickEdit}>
              <i className="fa fa-pencil fa-lg" data-id="{this.props.variant._id}"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

/**
 * Default props for SimpleVariant Component
 * @type {Object}
 */
Variant.defaultProps = {
  variant: {
    title: "",
    displayPrice: ""
  }
};
