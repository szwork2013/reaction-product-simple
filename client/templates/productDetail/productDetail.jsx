// TODO: Placeholder imports
// import React from "react"
// import TextField from "reaction-ui/textfield"
// TODO: For now lets pretend we have to do imports
const Tags = ReactionUI.Components.Tags;
const TextField = ReactionUI.Components.TextField;

ProductDetail = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const handle = Meteor.subscribe("Product", Router.current().params._id);

    return {
      product: selectedProduct(),
      tags: ReactionSimpleProduct.tags,
      media: ReactionCore.Media.getProductMedia(),
      variants: ReactionSimpleProduct.variants,
      childVariants: ReactionSimpleProduct.childVariants,
      editable: ReactionCore.hasPermission("createProduct")
    };
  },

  handleFieldUpdate(event) {
    console.log(event.target.value);
  },

  renderMediaGallery() {

    if (this.data.media.length) {
      return this.data.media.map((image, index) => {
        console.log(image);
        return <ProductMedia key={index} type="product" media={image}></ProductMedia>;
      });
    }

    return <ProductMedia type="product"></ProductMedia>;
  },

  render() {
    const product = this.data.product;
    const editable = this.data.editable;

    return (
      <div className="productDetail" itemScope itemType="http://schema.org/Product">


        <div className="header">
          <h1 id="title">
            <TextField name="title" value={product.title} onBlur={this.handleFieldUpdate}></TextField>
          </h1>
          <div className="pageTitle" itemProp="name">
            <TextField name="pageTitle" value={product.pageTitle}></TextField>
          </div>
        </div>

        <div className="column">
          {this.renderMediaGallery()}
          <Tags tags={this.data.tags}></Tags>
          <Metadata metafields={product.metafields} editable={editable}></Metadata>
        </div>

        <div className="column">
          <TextField name="pageTitle" value={product.vendor}></TextField>

          <TextField name="description" value={product.description} multiline={true}></TextField>

          <VariantSelector variants={this.data.variants}></VariantSelector>
        </div>
      </div>
    );
  }
});
