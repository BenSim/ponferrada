import { storiesOf } from "@storybook/react";
import React from "react";

import RecoveryWordsIcon from "../../theme/assets/badgeIcon/recoveryWords.svg";
import { medulasRoot, Storybook } from "../../utils/storybook";
import Block from "../Block";
import Img from "../Image";
import Typography from "../Typography";
import Badge from "./index";

storiesOf(`${medulasRoot}/components`, module).add("Badge Icon", () => (
  <Storybook>
    <div style={{ margin: "36px" }}>
      <Block marginBottom={3}>This shows the check variant</Block>
      <Badge variant="check">
        <Img src={RecoveryWordsIcon} alt="Icon" />
      </Badge>
    </div>
    <div style={{ margin: "36px" }}>
      <Block marginBottom={2}>This shows the badge variant</Block>
      <Badge variant="dot">
        <Img src={RecoveryWordsIcon} alt="Icon" />
      </Badge>
    </div>
    <div style={{ margin: "36px" }}>
      <Block marginBottom={2}>This shows the error badge variant</Block>
      <Badge variant="dot" color="error">
        <Img src={RecoveryWordsIcon} alt="Icon" />
      </Badge>
    </div>
    <div style={{ margin: "36px" }}>
      <Block marginBottom={2}>This shows the invisible variant</Block>
      <Badge variant="dot" invisible>
        <Img src={RecoveryWordsIcon} alt="Icon" />
      </Badge>
    </div>
    <div style={{ margin: "36px" }}>
      <Block marginBottom={2}>This shows badge with text</Block>
      <Badge variant="text" badgeContent="Some text long text">
        <Typography variant="body2">Cont</Typography>
      </Badge>
    </div>
  </Storybook>
));
