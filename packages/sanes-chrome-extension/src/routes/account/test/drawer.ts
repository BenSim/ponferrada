import { DRAWER_HTML_ID } from 'medulas-react-components/lib/components/Drawer';
import TestUtils from 'react-dom/test-utils';
import { click } from '../../../utils/test/dom';
import { findRenderedDOMComponentWithId } from '../../../utils/test/reactElemFinder';

interface InitDrawerResult {
  readonly recoveryPhraseLink: Element;
  readonly requestsLink: Element;
  readonly logoutLink: Element;
  readonly termsLink: Element;
}

const initDrawer = async (drawerComponent: React.Component): Promise<InitDrawerResult> => {
  const drawerButton = TestUtils.scryRenderedDOMComponentsWithTag(drawerComponent, 'button')[0];
  expect(drawerButton.getAttribute('aria-label')).toBe('Open drawer');
  click(drawerButton);

  const drawerList = await findRenderedDOMComponentWithId(drawerComponent, DRAWER_HTML_ID);
  const drawerElements = (drawerList as Element).querySelectorAll('div > div:nth-of-type(2)');
  expect(drawerElements.length).toBe(4);
  const [recoveryPhraseLink, requestsLink, logoutLink, termsLink] = drawerElements;

  expect(recoveryPhraseLink.textContent).toBe('Recovery words');
  expect(requestsLink.textContent).toBe('Requests');
  expect(logoutLink.textContent).toBe('Logout');
  expect(termsLink.textContent).toBe('Terms & Conditions');

  return { recoveryPhraseLink, requestsLink, logoutLink, termsLink };
};

export const clickRecoveryPhrase = async (drawerComponent: React.Component): Promise<void> => {
  const { recoveryPhraseLink } = await initDrawer(drawerComponent);
  click(recoveryPhraseLink);
};

export const clickRequests = async (drawerComponent: React.Component): Promise<void> => {
  const { requestsLink } = await initDrawer(drawerComponent);
  click(requestsLink);
};

export const clickLogout = async (drawerComponent: React.Component): Promise<void> => {
  const { logoutLink } = await initDrawer(drawerComponent);
  click(logoutLink);
};

export const clickTerms = async (drawerComponent: React.Component): Promise<void> => {
  const { termsLink } = await initDrawer(drawerComponent);
  click(termsLink);
};
