
class VariantSelector extends React.Component {
  diplsyName: "Variant Selector"

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
}

VariantSelector.propTypes = {
  variants: React.PropTypes.array.isRequired
};

ReactionProductSimple.Components.VariantSelector = VariantSelector;
