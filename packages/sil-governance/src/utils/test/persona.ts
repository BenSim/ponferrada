import { Page } from "puppeteer";
import { sleep } from "ui-logic";

import { travelToDashboardE2e } from "../../routes/dashboard/test/travelToDashboard";
import { DASHBOARD_ROUTE } from "../../routes/paths";
import { whenOnNavigatedToE2eRoute } from "./navigation";
import { findRenderedE2EComponentWithId } from "./reactElemFinder";

const CREATE_WALLET_ID_STEP_1 = "create-wallet-step1";
const CREATE_WALLET_ID_STEP_2 = "create-wallet-step2";
const CREATE_WALLET_ID_STEP_3 = "create-wallet-step3";
const PASSWORD_FIELD = "passwordInputField";
const PASSWORD_CONFIRM_FIELD = "passwordConfirmInputField";
const TERMS_ACCEPT_FIELD = "termsAcceptCheckboxField";

const RESTORE_WALLET_ID_STEP_1 = "/restore-wallet";
const RESTORE_WALLET_ID_STEP_2 = "/restore-wallet2";
const MNEMONIC_FIELD = "mnemonicField";
const PASSWORD_FIELD_RESTORE = "passwordField";
const PASSWORD_CONFIRM_FIELD_RESTORE = "passwordConfirmField";

async function clickCreatePersona(page: Page): Promise<void> {
  await page.click("#welcome-create-wallet");
}

export const submitExtensionCreateWalletForm = async (page: Page, password: string): Promise<void> => {
  await clickCreatePersona(page);

  // Fill the form
  await page.waitForSelector(`#${CREATE_WALLET_ID_STEP_1}`);
  await page.type(`input[name="${PASSWORD_FIELD}"]`, password);
  await page.type(`input[name="${PASSWORD_CONFIRM_FIELD}"]`, password);
  await page.click(`input[name="${TERMS_ACCEPT_FIELD}"]`);
  await page.click('button[type="submit"]');

  // Show recovery words page
  await page.waitForSelector(`#${CREATE_WALLET_ID_STEP_2}`);
  const buttons = await page.$$("button");
  await buttons[1].click();

  // Security hint page
  await page.waitForSelector(`#${CREATE_WALLET_ID_STEP_3}`);
  await page.click('button[type="submit"]');
  await whenOnNavigatedToE2eRoute(page, "/wallet");
};

export const submitExtensionRestoreWalletForm = async (
  page: Page,
  mnemonic: string,
  password: string,
): Promise<void> => {
  await page.bringToFront();
  await page.click("#welcome-import-wallet");

  // Enter mnemonic
  await findRenderedE2EComponentWithId(page, RESTORE_WALLET_ID_STEP_1);
  await page.type(`textarea[name="${MNEMONIC_FIELD}"]`, mnemonic);
  await page.click('button[type="submit"]');

  // Enter password
  await findRenderedE2EComponentWithId(page, RESTORE_WALLET_ID_STEP_2);
  await page.type(`input[name="${PASSWORD_FIELD_RESTORE}"]`, password);
  await page.type(`input[name="${PASSWORD_CONFIRM_FIELD_RESTORE}"]`, password);
  await page.click('button[type="submit"]');
  await sleep(2000);

  await whenOnNavigatedToE2eRoute(page, "/wallet");
};

export async function acceptGetIdentitiesRequest(page: Page): Promise<void> {
  await page.bringToFront();

  // click on drawer
  await page.click('[aria-label="Open drawer"]');
  await sleep(1000);

  // click on first request
  await page.click("ul > li > div");
  await sleep(500);

  const buttons = await page.$$("button");

  // accept it
  await buttons[3].click();
}

export async function rejectGetIdentitiesRequest(page: Page): Promise<void> {
  await page.bringToFront();

  // click on drawer
  await page.click('[aria-label="Open drawer"]');
  await sleep(1000);

  // click on first request
  await page.click("ul > li > div");
  await sleep(500);

  let buttons = await page.$$("button");

  // reject it
  await buttons[4].click();
  await sleep(500);

  buttons = await page.$$("button");
  // confirm rejection
  await buttons[3].click();
}

export async function acceptEnqueuedRequest(extensionPage: Page): Promise<void> {
  await extensionPage.bringToFront();
  await extensionPage.click("ul > li > div");
  await sleep(500);
  const buttons = await extensionPage.$$("button");

  // accept it
  await buttons[3].click();
}

export async function rejectEnqueuedRequest(extensionPage: Page): Promise<void> {
  await extensionPage.bringToFront();
  await extensionPage.click("ul > li > div");
  await sleep(500);
  let buttons = await extensionPage.$$("button");

  // reject it
  await buttons[4].click();
  await sleep(500);

  buttons = await extensionPage.$$("button");
  // confirm rejection
  await buttons[3].click();
}

export async function loginAsGovernor(page: Page, extensionPage: Page): Promise<void> {
  await submitExtensionRestoreWalletForm(
    extensionPage,
    "degree tackle suggest window test behind mesh extra cover prepare oak script",
    "12345678",
  );

  await page.bringToFront();
  await travelToDashboardE2e(page);
  await sleep(1000);
  await acceptGetIdentitiesRequest(extensionPage);
  await page.bringToFront();
  await whenOnNavigatedToE2eRoute(page, DASHBOARD_ROUTE);
}
