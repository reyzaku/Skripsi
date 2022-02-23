data.map((product) => product.products.map((item) => (
    {
        productId: item.productId,
        size: item.size,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity
    }
))