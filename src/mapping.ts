import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Contract,
  SignatureValidatorApproval,
  Fill,
  Cancel,
  CancelUpTo,
  AssetProxyRegistered
} from "../generated/Contract/Contract"
import { fills } from "../generated/schema"

export function handleSignatureValidatorApproval(
  event: SignatureValidatorApproval
): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  //let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  //if (entity == null) {
  //  entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
  //  entity.count = BigInt.fromI32(0)
  //}

  // BigInt and BigDecimal math are supported
  //entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  //entity.signerAddress = event.params.signerAddress
  //entity.validatorAddress = event.params.validatorAddress

  // Entities can be written to the store with `.save()`
  //entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.filled(...)
  // - contract.batchFillOrders(...)
  // - contract.cancelled(...)
  // - contract.matchOrders(...)
  // - contract.fillOrderNoThrow(...)
  // - contract.assetProxies(...)
  // - contract.batchFillOrKillOrders(...)
  // - contract.batchFillOrdersNoThrow(...)
  // - contract.getAssetProxy(...)
  // - contract.transactions(...)
  // - contract.fillOrKillOrder(...)
  // - contract.allowedValidators(...)
  // - contract.marketSellOrders(...)
  // - contract.getOrdersInfo(...)
  // - contract.preSigned(...)
  // - contract.owner(...)
  // - contract.isValidSignature(...)
  // - contract.marketBuyOrdersNoThrow(...)
  // - contract.fillOrder(...)
  // - contract.getOrderInfo(...)
  // - contract.orderEpoch(...)
  // - contract.ZRX_ASSET_DATA(...)
  // - contract.marketSellOrdersNoThrow(...)
  // - contract.EIP712_DOMAIN_HASH(...)
  // - contract.marketBuyOrders(...)
  // - contract.currentContextAddress(...)
  // - contract.VERSION(...)
}

export function handleFill(event: Fill): void {
  let entity = fills.load(event.transaction.from.toHex())

  if (entity == null) {
    entity = new fills(event.transaction.from.toHex())
  }

  entity.makerAddress = <String>event.params.makerAddress
  entity.feeRecipientAddress = <String>event.params.feeRecipientAddress
  entity.takerAddress = <String>event.params.takerAddress
  entity.senderAddress = <String>event.params.senderAddress
  entity.makerFilledAmount = event.params.makerAssetFilledAmount
  entity.takerFilledAmount = event.params.takerAssetFilledAmount
  entity.makerFee = event.params.makerFeePaid
  entity.takerFee = event.params.takerFeePaid
  entity.orderHash = <String>event.params.orderHash
  entity.makerAssetData = <Bytes>event.params.makerAssetData
  entity.takerAssetData = <Bytes>event.params.takerAssetData

  entity.save()
}

export function handleCancel(event: Cancel): void {}

export function handleCancelUpTo(event: CancelUpTo): void {}

export function handleAssetProxyRegistered(event: AssetProxyRegistered): void {}
