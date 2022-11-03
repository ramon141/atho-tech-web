import { getActiveConfigurations } from "./calcs";

export const makeMessage = (userName, products, services) => {
  let message =
    `Olá ${userName.trim()}, aqui seu orçamento realizado na empresa Atho Tech\n\nItens:\n`;

  let total = 0;

  Object.keys(products).map((key) => {
    const product = products[key];
    message += `    ${product.quantity || 1}x ${product.description}\n`;
    total += (product.quantity * getActiveConfigurations(product).value);
  })

  message += `\nServiços: \n`;
  Object.keys(services).map((key) => {
    const service = services[key];
    message += `    ${service.description}\n`;
  })

  total += (products['1']?.quantity || 1) * 90;
  total += 90;

  message += `\n*Total*: ${total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`;

  return window.encodeURIComponent(message);
};
