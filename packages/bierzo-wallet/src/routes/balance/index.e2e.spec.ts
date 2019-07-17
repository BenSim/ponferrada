import express, { Request, Response } from 'express';
import { Server } from 'http';
import { Browser, Page } from 'puppeteer';

import { closeBrowser, createExtensionPage, createPage, launchBrowser } from '../../utils/test/e2e';
import { withChainsDescribe } from '../../utils/test/testExecutor';
import {
  getFirstCurrencyBalanceE2E,
  getSecondCurrencyBalanceE2E,
  getThirdCurrencyBalanceE2E,
} from './test/operateBalances';
import { travelToBalanceE2E } from './test/travelToBalance';

withChainsDescribe(
  'E2E > Balance route',
  (): void => {
    let browser: Browser;
    let page: Page;
    let extensionPage: Page;
    let server: Server;

    beforeAll(() => {
      const app = express();

      app.use(express.static(require('path').join(__dirname, '/../../../build')));

      app.get('/*', function(req: Request, res: Response) {
        res.sendFile(require('path').join(__dirname, 'build', 'index.html'));
      });

      server = app.listen(9000);
    });

    beforeEach(async (): Promise<void> => {
      browser = await launchBrowser();
      page = await createPage(browser);
      extensionPage = await createExtensionPage(browser);
      await travelToBalanceE2E(browser, page, extensionPage);
    }, 45000);

    afterEach(
      async (): Promise<void> => {
        await closeBrowser(browser);
      },
    );

    afterAll(() => {
      server.close();
    });

    it('should contain balances', async (): Promise<void> => {
      const firstBalance = await getFirstCurrencyBalanceE2E(await page.$$('h6'));
      const secondBalance = await getSecondCurrencyBalanceE2E(await page.$$('h6'));
      const thirdBalance = await getThirdCurrencyBalanceE2E(await page.$$('h6'));

      expect(firstBalance).toBe('10 BASH');
      expect(secondBalance).toBe('10 CASH');
      expect(thirdBalance).toBe('10 ETH');
    }, 45000);
  },
);