// TODO: Placeholder imports
// import React from "react"
// import TextField from "reaction-ui/textfield"
// TODO: For now lets pretend we have to do imports
const Tags = ReactionUI.Components.Tags;
const TextField = ReactionUI.Components.TextField;
const Items = ReactionUI.Components.Items;
const VariantSelector = ReactionProductSimple.Components.VariantSelector;
console.log("Variant Selector");
ProductDetail = React.createClass({
  displayName: "Product Detail - Simple",

  mixins: [ReactMeteorData],

  getMeteorData() {
    let data = {};
    const handle = Meteor.subscribe("Product", Router.current().params._id);

    data = {
      isLoadingProduct: handle.ready(),
      product: selectedProduct(),
      tags: ReactionSimpleProduct.tags,
      media: ReactionCore.Media.getProductMedia(),
      variants: ReactionSimpleProduct.variants,
      childVariants: ReactionSimpleProduct.childVariants,
      editable: ReactionCore.hasPermission("createProduct")
    };

    return data;
  },

  handleFieldUpdate(event) {
    ReactionSimpleProduct.updateProduct(
      this.data.product._id,
      event.target.name,
      event.target.value
    );
  },

  onTagUpdate(value) {

  },

  handleTagCreate(value) {
    console.log("create tag, maybe?", value);
    ReactionSimpleProduct.createTag(this.data.product._id, value);
  },

  handleTagRemove(tagId) {
    ReactionSimpleProduct.removeTag(this.data.product._id, tagId);
    console.log("remove a tag", tagId);
  },


  handleTagUpdate(tagId) {
    // ReactionSimpleProduct.removeTag(this.data.product._id, value);
    console.log("remove a tag", tagId);
  },

  handleTagBookmark(tagId) {
    // ReactionSimpleProduct.removeTag(this.data.product._id, value);
    console.log("remove a tag", tagId);
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





  renderTags() {
    if (this.data.tags) {
      return (
        <div className="rui group">
          <h3>Tags</h3>
          <Tags
            tags={this.data.tags}
            editable={this.data.editable}
            refocusAfterCreate={true}
            onTagBookmark={this.handleTagBookmark}
            onTagCreate={this.handleTagCreate}
            onTagRemove={this.handleTagRemove}
            onTagUpdate={this.handleTagUpdate}
          />
        </div>
      );
    }
  },

  renderDetails() {
    if (this.data.product.metafields) {
      return (
        <div className="rui details">
          <h3>Details</h3>
          <Metadata metafields={this.data.product.metafields} editable={this.data.editable}></Metadata>
        </div>
      );
    }
  },


  render() {
    const product = this.data.product || {};

    return (
      <div className="rui productDetail" itemScope itemType="http://schema.org/Product">
        <div className="header">
          <Items autoWrap={true}>
            <h1 id="title">
              <TextField
                align="center"
                name="title"
                onBlur={this.handleFieldUpdate}
                value={product.title}
              />
            </h1>
            <div className="pageTitle" itemProp="name">
              <TextField
                align="center"
                name="pageTitle"
                onValueChange={this.handleFieldUpdate}
                value={product.pageTitle}
              />
            </div>
          </Items>
        </div>

        <div className="column">
          <Items autoWrap={true}>
            {this.renderMediaGallery()}
            {this.renderTags()}
            {this.renderDetails()}
          </Items>
        </div>

        <div className="column">
          <Items>
            <TextField name="pageTitle" value={product.vendor} />
            <TextField multiline={true} name="description" value={product.description} />
            <VariantSelector variants={this.data.variants} />
          </Items>
        </div>
      </div>
    );
  }
});
