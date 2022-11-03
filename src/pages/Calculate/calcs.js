function verifyDependencies(product, products, dependecies) {
    dependecies.forEach((dependency) => {

        if (product.id === dependency.depends_on) {
            const productDependency = products[dependency.configuration.productsId];
            const quantityProduct = products[product.id].quantity;

            if (dependency.type_dependency === 'change_quantity') {
                const multiplier = dependency.multiplier;

                products[dependency.configuration.productsId].quantity = Math.ceil(quantityProduct * multiplier);

                products = verifyDependencies(products[dependency.configuration.productsId], products, dependecies);

            } else if (dependency.type_dependency === 'change_configuration') {
                const limits = dependency.condition_quantity;
                if (quantityProduct >= limits[0] && limits[1] >= quantityProduct) {
                    products[dependency.configuration.productsId].configurations =
                        activeConfiguration(productDependency.configurations, dependency.configurationId);
                }

            } else {
                console.log('Tipo de dependencia inválida: ' + dependency.type_dependency);
            }
        }
    })

    return products;
}

function activeConfiguration(configurations, idActive) {
    let newConfigurations = {};
    Object.keys(configurations).forEach((key) => {
        newConfigurations[key] = { ...configurations[key], usage: key == idActive }
    })
    return newConfigurations;
}

export const getActiveConfigurations = (product) => {
    let result = undefined;
    Object.keys(product.configurations).forEach((key) => {
        if (product.configurations[key].usage)
            result = product.configurations[key];
    })

    if (!result)
        console.log(`Nenhuma configuração encontrada para o produto ${product.description}`);

    return result;
}

export const addItem = (product, products, dependecies) => {
    let newProducts = { ...products };
    newProducts[product.id].quantity = newProducts[product.id].quantity + 1;

    return verifyDependencies(product, newProducts, dependecies);
}

export const subtractItem = (product, products, dependecies) => {
    let newProducts = { ...products };
    newProducts[product.id].quantity = newProducts[product.id].quantity - 1 || 1;

    return verifyDependencies(product, newProducts, dependecies);
}

export const getTotal = (products, services) => {
    let total = 0;

    Object.keys(products).map((key) => {
        const product = products[key];
        total += (product.quantity * getActiveConfigurations(product).value);
    })

    total += (products['1']?.quantity || 1) * 90;
    total += 90;


    return total;
}