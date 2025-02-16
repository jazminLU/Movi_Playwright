/*import { test, expect } from '@playwright/test';
import fs from 'fs';

test(' marcas, precios y cuotas en Tienda Movistar', async ({ page }) => {
  
    await page.goto('https://tiendaonline.movistar.com.ar');
    await expect(page).toHaveTitle(/Movistar/i);

    // scroll hasta la sección de "Marcas"
    console.log('⌛ Haciendo scroll hasta la sección de Marcas...');
    const filtroMarca = page.locator('//div[@class="filter-title" and text()="Marca"]');
    await filtroMarca.waitFor({ state: 'visible', timeout: 10000 });
    await filtroMarca.scrollIntoViewIfNeeded();
    await page.waitForTimeout(10000);

    // 4. Hacer clic en el desplegable "Marca"
    await filtroMarca.click();
    await page.waitForTimeout(1000);

    // HTML completo de los filtros de marca
    const marcasHTML = await page.locator('//a[@rel="nofollow"]').evaluateAll(nodes => 
        nodes.map(node => node.outerHTML)
    );

    console.log('✔ Marcas encontradas en HTML:');
    marcasHTML.forEach(html => console.log(html));

    console.log('⌛ Haciendo scroll hasta la sección de Precios...');
    const filtroPrecio = page.locator('//div[@class="filter-title" and text()="Precio"]');
    await filtroPrecio.waitFor({ state: 'visible', timeout: 5000 });
    await filtroPrecio.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // clic en el desplegable "Precio"
    await filtroPrecio.click();
    await page.waitForTimeout(1000);

    // precios disponibles usando XPath exacto
    console.log('⌛ Verificando precios disponibles...');
    const preciosXPath = [
        '//*[@id="filters-items"]/div[2]/div[2]/ol/li[1]/a', // $ 0 - $ 300.000
        '//*[@id="filters-items"]/div[2]/div[2]/ol/li[2]/a'  // $ 300.000 - $ 600.000
    ];

    for (const xpath of preciosXPath) {
        const filtroPrecioItem = page.locator(xpath);
        
        // Esperar a que el precio esté en el DOM y visible
          // Esperar a que el precio esté en el DOM y **visible**
          await filtroPrecioItem.waitFor({ state: 'visible', timeout: 5000 });
        await filtroPrecioItem.scrollIntoViewIfNeeded();
        await expect(filtroPrecioItem).toBeVisible();
    }

    console.log('✔ Todos los precios están visibles.');

    //  scroll hasta la sección de "Cuotas sin interés"
    console.log('⌛ Haciendo scroll hasta la sección de Cuotas sin interés...');
    const filtroCuotas = page.locator('//div[@class="filter-title" and text()="Cuotas sin interés"]');
    await filtroCuotas.waitFor({ state: 'visible', timeout: 5000 });
    await filtroCuotas.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // clic en  "Cuotas sin interés"
    await filtroCuotas.click();
    await page.waitForTimeout(1000);

    // Verificar cuotas disponibles
    console.log('⌛ Verificando opciones de cuotas sin interés...');
    const cuotasXPath = [
        '//*[@id="filters-items"]/div[3]/div[2]/ol/li[1]/a', // 3 cuotas
        '//*[@id="filters-items"]/div[3]/div[2]/ol/li[2]/a', // 6 cuotas
        '//*[@id="filters-items"]/div[3]/div[2]/ol/li[3]/a', // 9 cuotas
        '//*[@id="filters-items"]/div[3]/div[2]/ol/li[4]/a'  // 12 cuotas
    ];

    for (const xpath of cuotasXPath) {
        const filtroCuotaItem = page.locator(xpath);
        
        // Esperar a que el elemento de cuotas esté en el DOM y visible
        await filtroCuotaItem.waitFor({ state: 'attached', timeout: 5000 });
        await filtroCuotaItem.scrollIntoViewIfNeeded();
        await expect(filtroCuotaItem).toBeVisible();
    }

    console.log('✔ Todas las opciones de cuotas sin interés están visibles.');

        //scroll hasta la sección de "Memoria Interna"
        console.log('⌛ Haciendo scroll hasta la sección de Memoria Interna...');
        const filtroMemoria = page.locator('//div[@class="filter-title" and text()="Memoria interna"]');
        await filtroMemoria.waitFor({ state: 'visible', timeout: 5000 });
        await filtroMemoria.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
    
        //  clic en el desplegable "Memoria Interna"
        await filtroMemoria.click();
        await page.waitForTimeout(2000); // Esperar a que se desplieguen las opciones
    
        // opciones de memoria interna disponibles
        console.log('⌛ Verificando opciones de Memoria Interna...');
        const memoriaXPath = [
            '//*[@id="filters-items"]/div[5]/div[2]/ol/li[1]/a', // 64GB
            '//*[@id="filters-items"]/div[5]/div[2]/ol/li[2]/a', // 128GB
            '//*[@id="filters-items"]/div[5]/div[2]/ol/li[3]/a', // 512GB
            '//*[@id="filters-items"]/div[5]/div[2]/ol/li[4]/a', // 256GB
            '//*[@id="filters-items"]/div[5]/div[2]/ol/li[5]/a'  // 32GB
        ];
    
        for (const xpath of memoriaXPath) {
            const filtroMemoriaItem = page.locator(xpath);
            
            // elemento de memoria interna esté visible
            await filtroMemoriaItem.waitFor({ state: 'visible', timeout: 5000 });
            
            // Si aún no es visible, intentar hacer scroll
            if (!(await filtroMemoriaItem.isVisible())) {
                console.log(`🔄 ${xpath} no está visible, intentando hacer scroll...`);
                await filtroMemoriaItem.scrollIntoViewIfNeeded();
            }
    
            // Validar que sea visible
            await expect(filtroMemoriaItem).toBeVisible();
            console.log(`✔ ${xpath} está visible.`);
        }
    
        console.log('✔ Todas las opciones de Memoria Interna están visibles.');

            // 3. Hacer scroll hasta la sección de "Cámara"
    console.log('⌛ Haciendo scroll hasta la sección de Cámara...');
    const filtroCamara = page.locator('//*[@id="filters-items"]/div[6]/div[1]');
    
    await filtroCamara.waitFor({ state: 'visible', timeout: 5000 }); // Esperar a que el filtro sea visible
    await filtroCamara.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // 4. Intentar hacer clic en el desplegable "Cámara"
    console.log('🔄 Haciendo clic en el filtro "Cámara"...');
    try {
        await filtroCamara.click({ timeout: 3000 });
    } catch (error) {
        console.log('⚠ No se pudo hacer clic en "Cámara" de inmediato. Probando con force: true...');
        await filtroCamara.click({ force: true });
    }
    
    await page.waitForTimeout(2000); // Esperar a que se desplieguen las opciones

    // 5. Verificar las opciones de cámara disponibles
    console.log('⌛ Verificando opciones de Cámara...');
    const camaraXPath = [
        '//*[@id="filters-items"]/div[6]/div[2]/ol/li[1]/a', // 108 MP + 8 MP + 2 MP
        '//*[@id="filters-items"]/div[6]/div[2]/ol/li[2]/a', // 12 MP + 12 MP
        '//*[@id="filters-items"]/div[6]/div[2]/ol/li[3]/a', // 12 MP + 13 MP
        '//*[@id="filters-items"]/div[6]/div[2]/ol/li[4]/a', // 13 MP
        '//*[@id="filters-items"]/div[6]/div[2]/ol/li[5]/a', // 13 MP + 2 MP
        '//*[@id="filters-items"]/div[6]/div[2]/ol/li[6]/a'  // 5 MP
    ];

    for (const xpath of camaraXPath) {
        const filtroCamaraItem = page.locator(xpath);
        
        // Esperar a que el elemento de cámara esté visible
        await filtroCamaraItem.waitFor({ state: 'visible', timeout: 5000 });
        
        // Si aún no es visible, intentar hacer scroll
        if (!(await filtroCamaraItem.isVisible())) {
            console.log(`🔄 ${xpath} no está visible, intentando hacer scroll...`);
            await filtroCamaraItem.scrollIntoViewIfNeeded();
        }

        // Validar que sea visible
        await expect(filtroCamaraItem).toBeVisible();
        console.log(`✔ ${xpath} está visible.`);
    }

    console.log('✔ Todas las opciones de Cámara están visibles.');

 
    // 📌 📌 AGREGAR FILTRO "Tamaño de Pantalla"
    console.log('⌛ Haciendo scroll hasta la sección de Tamaño de Pantalla...');
    const filtroPantalla = page.locator('//div[@class="filter-title" and text()="Tamaño de pantalla"]');
    await filtroPantalla.waitFor({ state: 'visible', timeout: 5000 });
    await filtroPantalla.scrollIntoViewIfNeeded();
    await filtroPantalla.click();
    await page.waitForTimeout(1000);

    // 📌 Verificar opciones de Tamaño de Pantalla
    console.log('⌛ Verificando opciones de Tamaño de Pantalla...');
    const pantallaXPath = [
        '//*[@id="filters-items"]/div[7]/div[2]/ol/li[1]/a', // 6
        '//*[@id="filters-items"]/div[7]/div[2]/ol/li[2]/a', // 6.49
        '//*[@id="filters-items"]/div[7]/div[2]/ol/li[3]/a', // 6.1
        '//*[@id="filters-items"]/div[7]/div[2]/ol/li[4]/a', // 6.2
        '//*[@id="filters-items"]/div[7]/div[2]/ol/li[5]/a', // 6.4
        '//*[@id="filters-items"]/div[7]/div[2]/ol/li[6]/a'  // 6.5
    ];

    for (const xpath of pantallaXPath) {
        const filtroPantallaItem = page.locator(xpath);
        
        // Esperar a que el elemento de pantalla esté visible
        await filtroPantallaItem.waitFor({ state: 'visible', timeout: 5000 });

        // Si aún no es visible, intentar hacer scroll
        if (!(await filtroPantallaItem.isVisible())) {
            console.log(`🔄 ${xpath} no está visible, intentando hacer scroll...`);
            await filtroPantallaItem.scrollIntoViewIfNeeded();
        }

        // Validar que sea visible
        await expect(filtroPantallaItem).toBeVisible();
        console.log(`✔ ${xpath} está visible.`);
    }

    console.log('✔ Todas las opciones de Tamaño de Pantalla están visibles.');

    // 6. Esperar un poco antes de cerrar
    await page.waitForTimeout(3000);
});*/