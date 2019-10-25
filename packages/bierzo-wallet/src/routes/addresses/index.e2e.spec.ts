import clipboardy from "clipboardy";
import express, { Request, Response } from "express";
import { Server } from "http";
import { Browser, Page } from "puppeteer";

import { closeBrowser, closeToast, createPage, getToastMessage, launchBrowser } from "../../utils/test/e2e";
import { withChainsDescribe } from "../../utils/test/testExecutor";
import { waitForAllBalances } from "../balance/test/operateBalances";
import { travelToBalanceE2E } from "../balance/test/travelToBalance";
import { copyAddress, getAddressRow } from "./test/operateReceivePayment";
import { travelToAddressesE2E, travelToBlockchainAddressesTabE2E } from "./test/travelToReceivePayment";

withChainsDescribe("E2E > Receive Payment route", () => {
  let browser: Browser;
  let page: Page;
  let server: Server;

  beforeAll(() => {
    const app = express();

    app.use(express.static(require("path").join(__dirname, "/../../../build")));

    app.get("/*", function(req: Request, res: Response) {
      res.sendFile(require("path").join(__dirname, "build", "index.html"));
    });

    server = app.listen(9000);
  });

  beforeEach(async () => {
    browser = await launchBrowser();
    page = await createPage(browser);
  }, 60000);

  afterEach(async () => {
    await closeBrowser(browser);
  });

  afterAll(() => {
    server.close();
  });

  describe("Addresses tab", () => {
    it("should redirect to addresses route and check list of addresses", async () => {
      await travelToBalanceE2E(browser, page);
      await waitForAllBalances(page);

      await travelToAddressesE2E(page);
      await travelToBlockchainAddressesTabE2E(page);
      let [chainName, address] = await getAddressRow(page, 1);
      expect(chainName).toBe("Ganache");
      expect(address).toMatch(/^0x[a-fA-F0-9]{40}$/);

      [chainName, address] = await getAddressRow(page, 2);
      expect(chainName).toBe("IOV Devnet");
      expect(address).toMatch(/^tiov1[0-9a-z]{38}$/);

      [chainName, address] = await getAddressRow(page, 3);
      expect(chainName).toBe("Lisk Devnet");
      expect(address).toMatch(/^[0-9]+L$/);
    }, 35000);

    it("should copy address to clipboard and show toast with message", async () => {
      await travelToBalanceE2E(browser, page);
      await waitForAllBalances(page);

      await travelToAddressesE2E(page);
      await travelToBlockchainAddressesTabE2E(page);
      const address = await copyAddress(page, 1);

      expect(clipboardy.readSync()).toBe(address);

      const toastMessage = await getToastMessage(page);
      expect(toastMessage).toBe("Address has been copied to clipboard.");
      await closeToast(page);
    }, 35000);
  });
});
