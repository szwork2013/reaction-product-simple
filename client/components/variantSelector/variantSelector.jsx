
VariantSelector = class VariantSelector extends React.Component {

  props = {
    variants: []
  }

  renderVariant() {
    return this.props.variants.map((variant, index) => {
      return <Variant key={index} variant={variant}></Variant>;
    });
  }

  render() {
    return (
      <div className="variantSelector">
        {this.renderVariant()}
      </div>
    );
  }
};

VariantSelector.propTypes = {
  variants: React.PropTypes.array.isRequired
};
