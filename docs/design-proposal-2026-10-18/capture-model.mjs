/* global document, getComputedStyle, requestAnimationFrame */
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const folder=path.dirname(fileURLToPath(import.meta.url));
const require=createRequire(path.resolve(folder,'../../package.json'));
const {chromium}=require('@playwright/test');
const browser=await chromium.launch({channel:'chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce',serviceWorkers:'block'});const page=await context.newPage();await page.goto('http://localhost:3104/samples/knee-atlas');await page.getByRole('button',{name:/3\s*Recall/}).click();await page.waitForFunction(()=>[...document.querySelectorAll('[aria-hidden="true"] span')].some(e=>e.textContent==='?'&&getComputedStyle(e).visibility==='visible'));await page.getByRole('button',{name:'Reset view',exact:true}).click();await page.evaluate(()=>new Promise(resolve=>{let frames=0;function settle(){if(++frames>=45)resolve();else requestAnimationFrame(settle);}requestAnimationFrame(settle);}));await page.locator('div[aria-describedby="sample-model-help"]').screenshot({path:path.join(folder,'assets/knee-recognition-stage.png')});}finally{await browser.close();}
