import { getActiveConfigurations } from "./calcs";

export const makeMessage = (userName, products, services, budgetId) => {
  let message =
    `Orçamento nº ${budgetId}\n\n`;

  message +=
    `Olá *${userName.trim()}*, segue sua proposta comercial para instalação do seu sistema de segurança Eletrônica.\n\nItens:\n`;

  let total = 0;

  Object.keys(products).map((key) => {
    const product = products[key];
    const activeConfiguration = getActiveConfigurations(product);
    message += `    ${product.quantity || 1}x ${product.description}`;

    if (activeConfiguration.description.length > 1) {
      message += ` - ${activeConfiguration.description}\n`;
    } else {
      message += '\n';
    }

    total += (product.quantity * activeConfiguration.value);
  })

  message += `\nServiços: \n`;
  Object.keys(services).map((key) => {
    const service = services[key];
    if (service.description.includes('INSTALAÇÃO')) {
      message += `    ${(products['1']?.quantity || 1)}x ${service.description}\n`;
    } else {
      message += `    1x ${service.description}\n`;
    }
  })

  total += (products['1']?.quantity || 1) * 90;
  total += 90;

  message += `\n*Total: ${total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}*`;

  return window.encodeURIComponent(message);
};
