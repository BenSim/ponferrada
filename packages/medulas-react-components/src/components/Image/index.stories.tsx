import { storiesOf } from "@storybook/react";
import React from "react";

import download from "../../theme/assets/download.svg";
import iovLogo from "../../theme/assets/iov-logo2x.png";
import theme from "../../theme/utils/mui";
import { medulasRoot, Storybook } from "../../utils/storybook";
import Grid from "../Grid";
import GridItem from "../GridItem";
import CircleImage from "./CircleImage";
import Image from "./index";

storiesOf(`${medulasRoot}/components`, module).add("Images", () => (
  <Storybook>
    <Grid flexWrap="wrap" flexDirection="column">
      <GridItem marginBottom={4}>
        <Image src={iovLogo} alt="Iov Logo" />
      </GridItem>
      <GridItem marginBottom={4}>
        <CircleImage
          icon={download}
          circleColor={theme.palette.primary.main}
          alt="Download"
          dia={theme.spacing(4)}
          width={theme.spacing(2)}
          height={theme.spacing(2)}
        />
      </GridItem>
    </Grid>
  </Storybook>
));
