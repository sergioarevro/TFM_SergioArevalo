/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export type ERC20HoldDataStruct = {
  sender: string;
  recipient: string;
  notary: string;
  amount: BigNumberish;
  expirationDateTime: BigNumberish;
  secretHash: BytesLike;
  status: BigNumberish;
};

export type ERC20HoldDataStructOutput = [
  string,
  string,
  string,
  BigNumber,
  BigNumber,
  string,
  number
] & {
  sender: string;
  recipient: string;
  notary: string;
  amount: BigNumber;
  expirationDateTime: BigNumber;
  secretHash: string;
  status: number;
};

export interface IERC20HoldableTokenInterface extends utils.Interface {
  functions: {
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "hold(bytes32,address,address,uint256,uint256,bytes32)": FunctionFragment;
    "retrieveHoldData(bytes32)": FunctionFragment;
    "executeHold(bytes32,bytes32)": FunctionFragment;
    "releaseHold(bytes32)": FunctionFragment;
    "balanceOnHold(address)": FunctionFragment;
    "spendableBalanceOf(address)": FunctionFragment;
    "totalSupplyOnHold()": FunctionFragment;
    "holdStatus(bytes32)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "hold",
    values: [BytesLike, string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "retrieveHoldData",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "executeHold",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "releaseHold",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOnHold",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "spendableBalanceOf",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupplyOnHold",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "holdStatus",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "hold", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "retrieveHoldData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeHold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "releaseHold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "balanceOnHold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "spendableBalanceOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupplyOnHold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "holdStatus", data: BytesLike): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "ExecutedHold(bytes32,bytes32,address)": EventFragment;
    "NewHold(bytes32,address,address,uint256,uint256,bytes32)": EventFragment;
    "ReleaseHold(bytes32,address)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ExecutedHold"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewHold"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ReleaseHold"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  { owner: string; spender: string; value: BigNumber }
>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export type ExecutedHoldEvent = TypedEvent<
  [string, string, string],
  { holdId: string; lockPreimage: string; recipient: string }
>;

export type ExecutedHoldEventFilter = TypedEventFilter<ExecutedHoldEvent>;

export type NewHoldEvent = TypedEvent<
  [string, string, string, BigNumber, BigNumber, string],
  {
    holdId: string;
    recipient: string;
    notary: string;
    amount: BigNumber;
    expirationDateTime: BigNumber;
    lockHash: string;
  }
>;

export type NewHoldEventFilter = TypedEventFilter<NewHoldEvent>;

export type ReleaseHoldEvent = TypedEvent<
  [string, string],
  { holdId: string; sender: string }
>;

export type ReleaseHoldEventFilter = TypedEventFilter<ReleaseHoldEvent>;

export type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  { from: string; to: string; value: BigNumber }
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface IERC20HoldableToken extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IERC20HoldableTokenInterface;

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
    /**
     * Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default. This value changes when {approve} or {transferFrom} are called.
     */
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    /**
     * Sets `amount` as the allowance of `spender` over the caller's tokens. Returns a boolean value indicating whether the operation succeeded. IMPORTANT: Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729 Emits an {Approval} event.
     */
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    /**
     * Returns the amount of tokens owned by `account`.
     */
    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    /**
     * Returns the amount of tokens in existence.
     */
    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    /**
     * Moves `amount` tokens from the caller's account to `recipient`. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.
     */
    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    /**
     * Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism. `amount` is then deducted from the caller's allowance. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.
     */
    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    /**
     * Called by the sender to hold some tokens for a recipient that the sender can not release back to themself until after the expiration date.
     * @param amount of tokens to be transferred to the recipient on execution. Must be a non zero amount.
     * @param expirationDateTime UNIX epoch seconds the held amount can be released back to the sender by the sender. Past dates are allowed.
     * @param holdId a unique identifier for the hold.
     * @param lockHash optional keccak256 hash of a lock preimage. An empty hash will not enforce the hash lock when the hold is executed.
     * @param notary account that can execute the hold. Typically the recipient but can be a third party or a smart contract.
     * @param recipient optional account the tokens will be transferred to on execution. If a zero address, the recipient must be specified on execution of the hold.
     */
    hold(
      holdId: BytesLike,
      recipient: string,
      notary: string,
      amount: BigNumberish,
      expirationDateTime: BigNumberish,
      lockHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    retrieveHoldData(
      holdId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[ERC20HoldDataStructOutput]>;

    /**
     * Called by the notary to transfer the held tokens to the recipient that was set at the hold.
     * @param holdId a unique identifier for the hold.
     * @param lockPreimage the image used to generate the lock hash with a keccak256 hash
     */
    "executeHold(bytes32,bytes32)"(
      holdId: BytesLike,
      lockPreimage: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    /**
     * Called by the notary to transfer the held tokens to the recipient if no recipient was specified at the hold.
     * @param holdId a unique identifier for the hold.
     * @param lockPreimage the image used to generate the lock hash with a keccak256 hash
     * @param recipient the account the tokens will be transferred to on execution.
     */
    "executeHold(bytes32,bytes32,address)"(
      holdId: BytesLike,
      lockPreimage: BytesLike,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    /**
     * Called by the notary to transfer the held tokens to the set at the hold recipient if there is no hash lock.
     * @param holdId a unique identifier for the hold.
     */
    "executeHold(bytes32)"(
      holdId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    /**
     * Called by the notary at any time or the sender after the expiration date to release the held tokens back to the sender.
     * @param holdId a unique identifier for the hold.
     */
    releaseHold(
      holdId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    /**
     * Amount of tokens owned by an account that are held pending execution or release.
     * @param account owner of the tokens
     */
    balanceOnHold(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    /**
     * Total amount of tokens owned by an account including all the held tokens pending execution or release.
     * @param account owner of the tokens
     */
    spendableBalanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    totalSupplyOnHold(overrides?: CallOverrides): Promise<[BigNumber]>;

    /**
     * @param holdId a unique identifier for the hold.
     */
    holdStatus(holdId: BytesLike, overrides?: CallOverrides): Promise<[number]>;
  };

  /**
   * Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default. This value changes when {approve} or {transferFrom} are called.
   */
  allowance(
    owner: string,
    spender: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  /**
   * Sets `amount` as the allowance of `spender` over the caller's tokens. Returns a boolean value indicating whether the operation succeeded. IMPORTANT: Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729 Emits an {Approval} event.
   */
  approve(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  /**
   * Returns the amount of tokens owned by `account`.
   */
  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  /**
   * Returns the amount of tokens in existence.
   */
  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  /**
   * Moves `amount` tokens from the caller's account to `recipient`. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.
   */
  transfer(
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  /**
   * Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism. `amount` is then deducted from the caller's allowance. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.
   */
  transferFrom(
    sender: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  /**
   * Called by the sender to hold some tokens for a recipient that the sender can not release back to themself until after the expiration date.
   * @param amount of tokens to be transferred to the recipient on execution. Must be a non zero amount.
   * @param expirationDateTime UNIX epoch seconds the held amount can be released back to the sender by the sender. Past dates are allowed.
   * @param holdId a unique identifier for the hold.
   * @param lockHash optional keccak256 hash of a lock preimage. An empty hash will not enforce the hash lock when the hold is executed.
   * @param notary account that can execute the hold. Typically the recipient but can be a third party or a smart contract.
   * @param recipient optional account the tokens will be transferred to on execution. If a zero address, the recipient must be specified on execution of the hold.
   */
  hold(
    holdId: BytesLike,
    recipient: string,
    notary: string,
    amount: BigNumberish,
    expirationDateTime: BigNumberish,
    lockHash: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  retrieveHoldData(
    holdId: BytesLike,
    overrides?: CallOverrides
  ): Promise<ERC20HoldDataStructOutput>;

  /**
   * Called by the notary to transfer the held tokens to the recipient that was set at the hold.
   * @param holdId a unique identifier for the hold.
   * @param lockPreimage the image used to generate the lock hash with a keccak256 hash
   */
  "executeHold(bytes32,bytes32)"(
    holdId: BytesLike,
    lockPreimage: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  /**
   * Called by the notary to transfer the held tokens to the recipient if no recipient was specified at the hold.
   * @param holdId a unique identifier for the hold.
   * @param lockPreimage the image used to generate the lock hash with a keccak256 hash
   * @param recipient the account the tokens will be transferred to on execution.
   */
  "executeHold(bytes32,bytes32,address)"(
    holdId: BytesLike,
    lockPreimage: BytesLike,
    recipient: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  /**
   * Called by the notary to transfer the held tokens to the set at the hold recipient if there is no hash lock.
   * @param holdId a unique identifier for the hold.
   */
  "executeHold(bytes32)"(
    holdId: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  /**
   * Called by the notary at any time or the sender after the expiration date to release the held tokens back to the sender.
   * @param holdId a unique identifier for the hold.
   */
  releaseHold(
    holdId: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  /**
   * Amount of tokens owned by an account that are held pending execution or release.
   * @param account owner of the tokens
   */
  balanceOnHold(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  /**
   * Total amount of tokens owned by an account including all the held tokens pending execution or release.
   * @param account owner of the tokens
   */
  spendableBalanceOf(
    account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  totalSupplyOnHold(overrides?: CallOverrides): Promise<BigNumber>;

  /**
   * @param holdId a unique identifier for the hold.
   */
  holdStatus(holdId: BytesLike, overrides?: CallOverrides): Promise<number>;

  callStatic: {
    /**
     * Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default. This value changes when {approve} or {transferFrom} are called.
     */
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * Sets `amount` as the allowance of `spender` over the caller's tokens. Returns a boolean value indicating whether the operation succeeded. IMPORTANT: Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729 Emits an {Approval} event.
     */
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    /**
     * Returns the amount of tokens owned by `account`.
     */
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Returns the amount of tokens in existence.
     */
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Moves `amount` tokens from the caller's account to `recipient`. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.
     */
    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    /**
     * Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism. `amount` is then deducted from the caller's allowance. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.
     */
    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    /**
     * Called by the sender to hold some tokens for a recipient that the sender can not release back to themself until after the expiration date.
     * @param amount of tokens to be transferred to the recipient on execution. Must be a non zero amount.
     * @param expirationDateTime UNIX epoch seconds the held amount can be released back to the sender by the sender. Past dates are allowed.
     * @param holdId a unique identifier for the hold.
     * @param lockHash optional keccak256 hash of a lock preimage. An empty hash will not enforce the hash lock when the hold is executed.
     * @param notary account that can execute the hold. Typically the recipient but can be a third party or a smart contract.
     * @param recipient optional account the tokens will be transferred to on execution. If a zero address, the recipient must be specified on execution of the hold.
     */
    hold(
      holdId: BytesLike,
      recipient: string,
      notary: string,
      amount: BigNumberish,
      expirationDateTime: BigNumberish,
      lockHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    retrieveHoldData(
      holdId: BytesLike,
      overrides?: CallOverrides
    ): Promise<ERC20HoldDataStructOutput>;

    /**
     * Called by the notary to transfer the held tokens to the recipient that was set at the hold.
     * @param holdId a unique identifier for the hold.
     * @param lockPreimage the image used to generate the lock hash with a keccak256 hash
     */
    "executeHold(bytes32,bytes32)"(
      holdId: BytesLike,
      lockPreimage: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Called by the notary to transfer the held tokens to the recipient if no recipient was specified at the hold.
     * @param holdId a unique identifier for the hold.
     * @param lockPreimage the image used to generate the lock hash with a keccak256 hash
     * @param recipient the account the tokens will be transferred to on execution.
     */
    "executeHold(bytes32,bytes32,address)"(
      holdId: BytesLike,
      lockPreimage: BytesLike,
      recipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Called by the notary to transfer the held tokens to the set at the hold recipient if there is no hash lock.
     * @param holdId a unique identifier for the hold.
     */
    "executeHold(bytes32)"(
      holdId: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Called by the notary at any time or the sender after the expiration date to release the held tokens back to the sender.
     * @param holdId a unique identifier for the hold.
     */
    releaseHold(holdId: BytesLike, overrides?: CallOverrides): Promise<void>;

    /**
     * Amount of tokens owned by an account that are held pending execution or release.
     * @param account owner of the tokens
     */
    balanceOnHold(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * Total amount of tokens owned by an account including all the held tokens pending execution or release.
     * @param account owner of the tokens
     */
    spendableBalanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalSupplyOnHold(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * @param holdId a unique identifier for the hold.
     */
    holdStatus(holdId: BytesLike, overrides?: CallOverrides): Promise<number>;
  };

  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null
    ): ApprovalEventFilter;
    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null
    ): ApprovalEventFilter;

    "ExecutedHold(bytes32,bytes32,address)"(
      holdId?: BytesLike | null,
      lockPreimage?: null,
      recipient?: null
    ): ExecutedHoldEventFilter;
    ExecutedHold(
      holdId?: BytesLike | null,
      lockPreimage?: null,
      recipient?: null
    ): ExecutedHoldEventFilter;

    "NewHold(bytes32,address,address,uint256,uint256,bytes32)"(
      holdId?: BytesLike | null,
      recipient?: string | null,
      notary?: string | null,
      amount?: null,
      expirationDateTime?: null,
      lockHash?: null
    ): NewHoldEventFilter;
    NewHold(
      holdId?: BytesLike | null,
      recipient?: string | null,
      notary?: string | null,
      amount?: null,
      expirationDateTime?: null,
      lockHash?: null
    ): NewHoldEventFilter;

    "ReleaseHold(bytes32,address)"(
      holdId?: BytesLike | null,
      sender?: null
    ): ReleaseHoldEventFilter;
    ReleaseHold(
      holdId?: BytesLike | null,
      sender?: null
    ): ReleaseHoldEventFilter;

    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null
    ): TransferEventFilter;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null
    ): TransferEventFilter;
  };

  estimateGas: {
    /**
     * Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default. This value changes when {approve} or {transferFrom} are called.
     */
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * Sets `amount` as the allowance of `spender` over the caller's tokens. Returns a boolean value indicating whether the operation succeeded. IMPORTANT: Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729 Emits an {Approval} event.
     */
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    /**
     * Returns the amount of tokens owned by `account`.
     */
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Returns the amount of tokens in existence.
     */
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Moves `amount` tokens from the caller's account to `recipient`. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.
     */
    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    /**
     * Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism. `amount` is then deducted from the caller's allowance. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.
     */
    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    /**
     * Called by the sender to hold some tokens for a recipient that the sender can not release back to themself until after the expiration date.
     * @param amount of tokens to be transferred to the recipient on execution. Must be a non zero amount.
     * @param expirationDateTime UNIX epoch seconds the held amount can be released back to the sender by the sender. Past dates are allowed.
     * @param holdId a unique identifier for the hold.
     * @param lockHash optional keccak256 hash of a lock preimage. An empty hash will not enforce the hash lock when the hold is executed.
     * @param notary account that can execute the hold. Typically the recipient but can be a third party or a smart contract.
     * @param recipient optional account the tokens will be transferred to on execution. If a zero address, the recipient must be specified on execution of the hold.
     */
    hold(
      holdId: BytesLike,
      recipient: string,
      notary: string,
      amount: BigNumberish,
      expirationDateTime: BigNumberish,
      lockHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    retrieveHoldData(
      holdId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * Called by the notary to transfer the held tokens to the recipient that was set at the hold.
     * @param holdId a unique identifier for the hold.
     * @param lockPreimage the image used to generate the lock hash with a keccak256 hash
     */
    "executeHold(bytes32,bytes32)"(
      holdId: BytesLike,
      lockPreimage: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    /**
     * Called by the notary to transfer the held tokens to the recipient if no recipient was specified at the hold.
     * @param holdId a unique identifier for the hold.
     * @param lockPreimage the image used to generate the lock hash with a keccak256 hash
     * @param recipient the account the tokens will be transferred to on execution.
     */
    "executeHold(bytes32,bytes32,address)"(
      holdId: BytesLike,
      lockPreimage: BytesLike,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    /**
     * Called by the notary to transfer the held tokens to the set at the hold recipient if there is no hash lock.
     * @param holdId a unique identifier for the hold.
     */
    "executeHold(bytes32)"(
      holdId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    /**
     * Called by the notary at any time or the sender after the expiration date to release the held tokens back to the sender.
     * @param holdId a unique identifier for the hold.
     */
    releaseHold(
      holdId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    /**
     * Amount of tokens owned by an account that are held pending execution or release.
     * @param account owner of the tokens
     */
    balanceOnHold(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * Total amount of tokens owned by an account including all the held tokens pending execution or release.
     * @param account owner of the tokens
     */
    spendableBalanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalSupplyOnHold(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * @param holdId a unique identifier for the hold.
     */
    holdStatus(
      holdId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    /**
     * Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default. This value changes when {approve} or {transferFrom} are called.
     */
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Sets `amount` as the allowance of `spender` over the caller's tokens. Returns a boolean value indicating whether the operation succeeded. IMPORTANT: Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729 Emits an {Approval} event.
     */
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Returns the amount of tokens owned by `account`.
     */
    balanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Returns the amount of tokens in existence.
     */
    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Moves `amount` tokens from the caller's account to `recipient`. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.
     */
    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism. `amount` is then deducted from the caller's allowance. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.
     */
    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Called by the sender to hold some tokens for a recipient that the sender can not release back to themself until after the expiration date.
     * @param amount of tokens to be transferred to the recipient on execution. Must be a non zero amount.
     * @param expirationDateTime UNIX epoch seconds the held amount can be released back to the sender by the sender. Past dates are allowed.
     * @param holdId a unique identifier for the hold.
     * @param lockHash optional keccak256 hash of a lock preimage. An empty hash will not enforce the hash lock when the hold is executed.
     * @param notary account that can execute the hold. Typically the recipient but can be a third party or a smart contract.
     * @param recipient optional account the tokens will be transferred to on execution. If a zero address, the recipient must be specified on execution of the hold.
     */
    hold(
      holdId: BytesLike,
      recipient: string,
      notary: string,
      amount: BigNumberish,
      expirationDateTime: BigNumberish,
      lockHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    retrieveHoldData(
      holdId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Called by the notary to transfer the held tokens to the recipient that was set at the hold.
     * @param holdId a unique identifier for the hold.
     * @param lockPreimage the image used to generate the lock hash with a keccak256 hash
     */
    "executeHold(bytes32,bytes32)"(
      holdId: BytesLike,
      lockPreimage: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Called by the notary to transfer the held tokens to the recipient if no recipient was specified at the hold.
     * @param holdId a unique identifier for the hold.
     * @param lockPreimage the image used to generate the lock hash with a keccak256 hash
     * @param recipient the account the tokens will be transferred to on execution.
     */
    "executeHold(bytes32,bytes32,address)"(
      holdId: BytesLike,
      lockPreimage: BytesLike,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Called by the notary to transfer the held tokens to the set at the hold recipient if there is no hash lock.
     * @param holdId a unique identifier for the hold.
     */
    "executeHold(bytes32)"(
      holdId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Called by the notary at any time or the sender after the expiration date to release the held tokens back to the sender.
     * @param holdId a unique identifier for the hold.
     */
    releaseHold(
      holdId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Amount of tokens owned by an account that are held pending execution or release.
     * @param account owner of the tokens
     */
    balanceOnHold(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Total amount of tokens owned by an account including all the held tokens pending execution or release.
     * @param account owner of the tokens
     */
    spendableBalanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalSupplyOnHold(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * @param holdId a unique identifier for the hold.
     */
    holdStatus(
      holdId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}