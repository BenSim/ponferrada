import { Algorithm, ChainConnector } from "@iov/bcp";
import { createBnsConnector } from "@iov/bns";
import { Slip10RawIndex } from "@iov/crypto";
import { createEthereumConnector } from "@iov/ethereum";
import { HdPaths } from "@iov/keycontrol";
import { createLiskConnector } from "@iov/lisk";

import { getErc20TokensConfig } from "../../../../../utils/tokens";
import { ChainSpec, CodecString } from "./configurationfile";

export enum CodecType {
  Bns,
  Lisk,
  Ethereum,
}

export function codecTypeFromString(input: CodecString): CodecType {
  switch (input) {
    case "bns":
      return CodecType.Bns;
    case "lsk":
      return CodecType.Lisk;
    case "eth":
      return CodecType.Ethereum;
    default:
      throw new Error(`Codec '${input}' not supported`);
  }
}

export function algorithmForCodec(codec: CodecType): Algorithm {
  switch (codec) {
    case CodecType.Bns:
    case CodecType.Lisk:
      return Algorithm.Ed25519;
    case CodecType.Ethereum:
      return Algorithm.Secp256k1;
    default:
      throw new Error(`unsupported codec: ${codec}`);
  }
}

export function pathBuilderForCodec(codecType: CodecType): (derivation: number) => readonly Slip10RawIndex[] {
  const pathBuilder = (derivation: number): readonly Slip10RawIndex[] => {
    switch (codecType) {
      case CodecType.Bns:
        return HdPaths.iov(derivation);
      case CodecType.Lisk:
        return HdPaths.bip44Like(134, derivation);
      case CodecType.Ethereum:
        return HdPaths.ethereum(derivation);
      default:
        throw new Error(`unsupported codec: ${codecType}`);
    }
  };
  return pathBuilder;
}

export function chainConnector(codec: CodecType, chainSpec: ChainSpec): ChainConnector {
  switch (codec) {
    case CodecType.Bns:
      return createBnsConnector(chainSpec.node, chainSpec.chainId);
    case CodecType.Lisk:
      return createLiskConnector(chainSpec.node, chainSpec.chainId);
    case CodecType.Ethereum:
      return createEthereumConnector(
        chainSpec.node,
        {
          scraperApiUrl: chainSpec.scraper,
          erc20Tokens: chainSpec.ethereumOptions
            ? getErc20TokensConfig(chainSpec.ethereumOptions)
            : undefined,
        },
        chainSpec.chainId,
      );
    default:
      throw new Error("No connector for this codec found");
  }
}
