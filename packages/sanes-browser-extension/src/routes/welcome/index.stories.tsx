import { storiesOf } from "@storybook/react";
import { Storybook } from "medulas-react-components";
import React from "react";

import { CHROME_EXTENSION_ROOT } from "../../utils/storybook";
import Layout from "./index";

storiesOf(CHROME_EXTENSION_ROOT, module).add(
  "Welcome page",
  (): JSX.Element => (
    <Storybook>
      <Layout />
    </Storybook>
  ),
);