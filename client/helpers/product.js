
ReactionSimpleProduct = {
  get tags() {
    let product = selectedProduct();
    if (product) {
      if (product.hashtags) {
        return _.map(product.hashtags, function (id) {
          return Tags.findOne(id);
        });
      }
    }
  },

  get variants() {
    let inventoryTotal = 0;
    const variants = [];
    const product = selectedProduct();

    if (product) {
      // top level variants
      for (let variant of product.variants) {
        if (!variant.parentId) {
          variants.push(variant);
        }
      }
      // calculate inventory total for all variants
      for (let variant of variants) {
        if (!isNaN(variant.inventoryQuantity)) {
          inventoryTotal += variant.inventoryQuantity;
        }


        variant.displayPrice = ReactionCore.Currency.formatPriceRange(getVariantPriceRange(variant._id));
      }
      // calculate percentage of total inventory of this product
      for (let variant of variants) {
        variant.inventoryTotal = inventoryTotal;
        variant.inventoryPercentage = parseInt(variant.inventoryQuantity /
          inventoryTotal * 100, 10);
        if (variant.title) {
          variant.inventoryWidth = parseInt(variant.inventoryPercentage -
            variant.title.length, 10);
        } else {
          variant.inventoryWidth = 0;
        }
      }
      return variants;
    }
  },

  get childVariants() {
    const variants = [];
    const product = selectedProduct();

    if (product) {
      let current = selectedVariant();
      if (current !== null ? current._id : void 0) {
        if (current.parentId) {
          for (let variant of product.variants) {
            if (variant.parentId === current.parentId && variant.optionTitle &&
              variant.type !== "inventory") {
              variants.push(variant);
            }
          }
        } else {
          for (let variant of product.variants) {
            if (variant.parentId === current._id && variant.optionTitle &&
              variant.type !== "inventory") {
              variants.push(variant);
            }
          }
        }
      }
      return variants;
    }
  }
}
