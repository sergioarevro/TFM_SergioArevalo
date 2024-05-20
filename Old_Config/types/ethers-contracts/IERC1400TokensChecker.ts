/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface IERC1400TokensCheckerInterface extends utils.Interface {
  functions: {
    "canTransferByPartition(bytes,bytes32,address,address,address,uint256,bytes,bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "canTransferByPartition",
    values: [
      BytesLike,
      BytesLike,
      string,
      string,
      string,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "canTransferByPartition",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IERC1400TokensChecker extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IERC1400TokensCheckerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    canTransferByPartition(
      payload: BytesLike,
      partition: BytesLike,
      operator: string,
      from: string,
      to: string,
      value: BigNumberish,
      data: BytesLike,
      operatorData: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string, string, string]>;
  };

  canTransferByPartition(
    payload: BytesLike,
    partition: BytesLike,
    operator: string,
    from: string,
    to: string,
    value: BigNumberish,
    data: BytesLike,
    operatorData: BytesLike,
    overrides?: CallOverrides
  ): Promise<[string, string, string]>;

  callStatic: {
    canTransferByPartition(
      payload: BytesLike,
      partition: BytesLike,
      operator: string,
      from: string,
      to: string,
      value: BigNumberish,
      data: BytesLike,
      operatorData: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string, string, string]>;
  };

  filters: {};

  estimateGas: {
    canTransferByPartition(
      payload: BytesLike,
      partition: BytesLike,
      operator: string,
      from: string,
      to: string,
      value: BigNumberish,
      data: BytesLike,
      operatorData: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    canTransferByPartition(
      payload: BytesLike,
      partition: BytesLike,
      operator: string,
      from: string,
      to: string,
      value: BigNumberish,
      data: BytesLike,
      operatorData: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}