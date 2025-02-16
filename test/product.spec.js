import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test('Seleccionar primer celular en la tienda Movistar', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.navigate();
    await productPage.selectFirstProduct();

    // Validar que el usuario llegó a la página del producto
    await expect(page).toHaveURL(/.*movistar\.com\.ar\/.*\.html/);

});
